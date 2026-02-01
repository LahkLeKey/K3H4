import {LifecycleStatus, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {routeSignature} from '../lib/geo-signature';
import {fetchOsrm} from '../lib/osrm-client';
import {EntityDirection, EntityKind, recordBankTransactionEntity,} from '../services/bank-actor';
import {createFreightLoad, findFreightLoad, loadFreightLoads, markFreightLoadCompleted,} from '../services/freight-actor';
import {ensureGeoActor} from '../services/geo-actor';
import {type GeoDirectionCachePayload, readGeoDirectionCache, writeGeoDirectionCache,} from '../services/geo-direction-cache';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const ROUTE_TTL_MS = 1000 * 60 * 60 * 6;  // 6 hours

const serializeLoad = (load: any) => ({
  ...load,
  distanceKm: load.distanceKm instanceof Prisma.Decimal ?
      load.distanceKm.toFixed(2) :
      load.distanceKm,
  cost: load.cost instanceof Prisma.Decimal ? load.cost.toFixed(2) : load.cost,
});

async function fetchOsrmRoute(
    origin: {lat: number; lng: number}, dest: {lat: number; lng: number}) {
  const coords = `${origin.lng},${origin.lat};${dest.lng},${dest.lat}`;
  const res = await fetchOsrm({
    service: 'route',
    profile: 'driving',
    coordinates: coords,
    params: {
      overview: 'full',
      geometries: 'geojson',
      steps: true,
      annotations: 'duration,distance',
      continue_straight: true,
    },
  });
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const route = res.body?.routes?.[0];
  if (!route?.distance || !route?.duration)
    throw new Error('Route unavailable');
  return {
    distanceKm: route.distance / 1000,
    durationMinutes: Math.round(route.duration / 60),
    geometry: route.geometry,
    route,
  };
}

type OsrmRouteDetails = {
  distanceKm: number; durationMinutes: number; geometry: any; route: any;
};

const sanitizeLabel = (value?: string|null) => (value ? value.trim() : null);

const describeInstruction = (step: any) => {
  const maneuver = step?.maneuver ?? {};
  if (typeof maneuver.instruction === 'string' &&
      maneuver.instruction.trim().length) {
    return maneuver.instruction;
  }
  const parts: string[] = [];
  if (maneuver.modifier) {
    parts.push(`${maneuver.modifier} turn`);
  } else if (maneuver.type) {
    parts.push(maneuver.type);
  }
  const name = typeof step?.name === 'string' ? step.name.trim() : '';
  if (name) {
    parts.push(`onto ${name}`);
  }
  return parts.length ? parts.join(' ') : 'Continue';
};

const buildSegments =
    (steps: any[], origin: {lat: number; lng: number},
     destination: {lat: number; lng: number}) => {
      return steps.map((step, index) => {
        const startCoord = step?.maneuver?.location;
        const nextStep = steps[index + 1];
        const endCoord =
            nextStep?.maneuver?.location ?? [destination.lng, destination.lat];
        const startLat =
            Number.isFinite(startCoord?.[1]) ? startCoord[1] : origin.lat;
        const startLng =
            Number.isFinite(startCoord?.[0]) ? startCoord[0] : origin.lng;
        const endLat =
            Number.isFinite(endCoord?.[1]) ? endCoord[1] : destination.lat;
        const endLng =
            Number.isFinite(endCoord?.[0]) ? endCoord[0] : destination.lng;
        return {
          sequence: index,
          instruction: describeInstruction(step),
          maneuverType: step?.maneuver?.type ?? null,
          maneuverModifier: step?.maneuver?.modifier ?? null,
          distanceMeters: Number.isFinite(step?.distance) ? step.distance : 0,
          durationSeconds: Number.isFinite(step?.duration) ?
              Math.round(step.duration) :
              null,
          startLat,
          startLng,
          endLat,
          endLng,
          geometry: step?.geometry ?? null,
          metadata: step,
        };
      });
    };

const buildStops =
    (origin: {lat: number; lng: number},
     destination: {lat: number; lng: number}, originLabel: string|null,
     destinationLabel: string|null) => {
      return [
        {
          sequence: 0,
          latitude: origin.lat,
          longitude: origin.lng,
          label: originLabel,
          address: originLabel,
          source: 'freight',
          metadata: {role: 'origin'},
        },
        {
          sequence: 1,
          latitude: destination.lat,
          longitude: destination.lng,
          label: destinationLabel,
          address: destinationLabel,
          source: 'freight',
          metadata: {role: 'destination'},
        },
      ];
    };

type EnsureGeoDirectionParams = {
  prisma: PrismaClient; userId: string; signature: string;
  origin: {lat: number; lng: number};
  destination: {lat: number; lng: number};
  actorId: string;
  originName: string | null;
  destinationName: string | null;
  osrmResponse?: OsrmRouteDetails;
};

const cacheStopData = (stops: ReturnType<typeof buildStops>) =>
    stops.map((stop) => ({
                sequence: stop.sequence,
                latitude: stop.latitude,
                longitude: stop.longitude,
                label: stop.label,
                address: stop.address,
                source: stop.source,
                metadata: stop.metadata,
              }));

const cacheSegmentData = (segments: ReturnType<typeof buildSegments>) =>
    segments.map((segment) => {
      const durationCandidate = segment.durationSeconds;
      const normalizedDuration = Number.isFinite(durationCandidate ?? NaN) ?
          Math.round(durationCandidate as number) :
          null;
      return {
        sequence: segment.sequence,
        instruction: segment.instruction,
        maneuverType: segment.maneuverType,
        maneuverModifier: segment.maneuverModifier,
        distanceMeters: Number.isFinite(segment.distanceMeters) ?
            segment.distanceMeters :
            null,
        durationSeconds: normalizedDuration,
        startLat: segment.startLat,
        startLng: segment.startLng,
        endLat: segment.endLat,
        endLng: segment.endLng,
        geometry: segment.geometry ?? null,
        metadata: segment.metadata ?? null,
      };
    });

const buildDirectionPayload =
    (params: EnsureGeoDirectionParams,
     route: OsrmRouteDetails): GeoDirectionCachePayload => {
      const stops = cacheStopData(buildStops(
          params.origin, params.destination, params.originName ?? 'Origin',
          params.destinationName ?? 'Destination'));
      const segments = cacheSegmentData(buildSegments(
          (route.route.legs ?? []).flatMap((leg: any) => leg.steps ?? []),
          params.origin, params.destination));
      const distanceMeters = route.route.distance;  // already meters
      const durationSeconds = Number.isFinite(route.route.duration) ?
          Math.round(route.route.duration) :
          null;
      return {
        signature: params.signature,
        userId: params.userId,
        provider: 'osrm',
        profile: 'driving',
        geometry: route.route.geometry ?? null,
        originLat: params.origin.lat,
        originLng: params.origin.lng,
        destinationLat: params.destination.lat,
        destinationLng: params.destination.lng,
        distanceMeters: Number.isFinite(distanceMeters) ? distanceMeters : null,
        durationSeconds,
        route: route.route,
        stops,
        segments,
        fetchedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + ROUTE_TTL_MS).toISOString(),
      };
    };

async function ensureGeoDirectionForLoad(params: EnsureGeoDirectionParams) {
  const existing = await readGeoDirectionCache(
      params.prisma, params.actorId, params.signature);
  if (existing) return existing;
  const osrmDetails = params.osrmResponse ??
      await fetchOsrmRoute(params.origin, params.destination);
  const payload = buildDirectionPayload(params, osrmDetails);
  await writeGeoDirectionCache(params.prisma, params.actorId, payload);
  return payload;
}

const decimalToNumber = (value: Prisma.Decimal|number|null|undefined) =>
    value === null || value === undefined ? null :
    typeof value === 'number'             ? value :
                                            Number(value);

const mapDirectionResponse = (direction: GeoDirectionCachePayload) => ({
  signature: direction.signature,
  provider: direction.provider,
  profile: direction.profile,
  geometry: direction.geometry ?? null,
  originLat: decimalToNumber(direction.originLat),
  originLng: decimalToNumber(direction.originLng),
  destinationLat: decimalToNumber(direction.destinationLat),
  destinationLng: decimalToNumber(direction.destinationLng),
  distanceMeters: direction.distanceMeters,
  durationSeconds: direction.durationSeconds,
  stops: (direction.stops ??
          []).map((stop) => ({
                    id: `${direction.signature}:stop:${stop.sequence}`,
                    sequence: stop.sequence,
                    latitude: stop.latitude,
                    longitude: stop.longitude,
                    label: stop.label,
                    address: stop.address,
                    source: stop.source,
                    metadata: stop.metadata ?? null,
                  })),
  segments: (direction.segments ??
             []).map((segment) => ({
                       id: `${direction.signature}:segment:${segment.sequence}`,
                       sequence: segment.sequence,
                       instruction: segment.instruction,
                       maneuverType: segment.maneuverType,
                       maneuverModifier: segment.maneuverModifier,
                       distanceMeters: segment.distanceMeters,
                       durationSeconds: segment.durationSeconds,
                       startLat: segment.startLat,
                       startLng: segment.startLng,
                       endLat: segment.endLat,
                       endLng: segment.endLng,
                       geometry: segment.geometry ?? null,
                       metadata: segment.metadata ?? null,
                     })),
});

export function registerFreightRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/freight',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const loads = await loadFreightLoads(prisma, userId);
        await rt({
          eventType: 'freight.list',
          source: 'api',
          payload: {count: loads.length}
        });
        return {loads: loads.map(serializeLoad)};
      },
  );

  server.post(
      '/freight',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          title?: string;
          originName?: string;
          originLat?: number;
          originLng?: number;
          destinationName?: string;
          destinationLat?: number;
          destinationLng?: number;
          ratePerKm?: number;
        }
        |undefined;

        const required = [body?.title, body?.originName, body?.destinationName];
        if (required.some((v) => !v || String(v).trim().length === 0)) {
          return reply.status(400).send(
              {error: 'title, originName, destinationName are required'});
        }
        const originLat = Number(body?.originLat);
        const originLng = Number(body?.originLng);
        const destinationLat = Number(body?.destinationLat);
        const destinationLng = Number(body?.destinationLng);
        if (![originLat, originLng, destinationLat, destinationLng].every(
                (n) => Number.isFinite(n))) {
          return reply.status(400).send(
              {error: 'origin/destination coordinates are required'});
        }
        const originLabel = body?.originName?.trim() || 'Origin';
        const destinationLabel = body?.destinationName?.trim() || 'Destination';

        let osrm;
        try {
          osrm = await fetchOsrmRoute(
              {lat: originLat, lng: originLng},
              {lat: destinationLat, lng: destinationLng});
        } catch (err) {
          request.log.error({err}, 'freight OSRM request failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message : 'OSRM route failed',
          });
        }
        const distance = osrm.distanceKm || 0;
        const ratePerKm = Number(body?.ratePerKm ?? 2);
        const cost = new Prisma.Decimal((distance * ratePerKm).toFixed(2));

        const load = await createFreightLoad(prisma, {
          userId,
          title: body?.title?.trim() || 'Freight load',
          originName: originLabel,
          originLat,
          originLng,
          destinationName: destinationLabel,
          destinationLat,
          destinationLng,
          distanceKm: Number(distance.toFixed(2)),
          durationMinutes: osrm.durationMinutes,
          cost,
          routeGeoJson: osrm.geometry,
          status: LifecycleStatus.PLANNING,
        });

        const signature = routeSignature(
            {lat: originLat, lng: originLng},
            {lat: destinationLat, lng: destinationLng});
        try {
          const actor = await ensureGeoActor(prisma, userId);
          const actorId = actor.id;
          await ensureGeoDirectionForLoad({
            prisma,
            userId,
            actorId,
            signature,
            origin: {lat: originLat, lng: originLng},
            destination: {lat: destinationLat, lng: destinationLng},
            originName: sanitizeLabel(originLabel),
            destinationName: sanitizeLabel(destinationLabel),
            osrmResponse: osrm,
          });
        } catch (err) {
          request.log.error({err, signature}, 'freight directions failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message :
                                          'Unable to cache directions',
          });
        }
        await rt({
          eventType: 'freight.create',
          source: 'api',
          payload: {id: load.id, title: load.title},
        });
        return {load: serializeLoad(load)};
      },
  );

  server.get(
      '/freight/:id/directions',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;

        const load = await findFreightLoad(prisma, userId, id);
        if (!load)
          return reply.status(404).send({error: 'Freight load not found'});

        const signature = routeSignature(
            {lat: Number(load.originLat), lng: Number(load.originLng)}, {
              lat: Number(load.destinationLat),
              lng: Number(load.destinationLng)
            });
        try {
          const actor = await ensureGeoActor(prisma, userId);
          const actorId = actor.id;
          const direction = await ensureGeoDirectionForLoad({
            prisma,
            userId,
            actorId,
            signature,
            origin: {lat: Number(load.originLat), lng: Number(load.originLng)},
            destination: {
              lat: Number(load.destinationLat),
              lng: Number(load.destinationLng)
            },
            originName: sanitizeLabel(load.originName),
            destinationName: sanitizeLabel(load.destinationName),
          });
          if (!direction) {
            return reply.status(404).send({error: 'Directions unavailable'});
          }
          return {direction: mapDirectionResponse(direction)};
        } catch (err) {
          request.log.error({err, id, signature}, 'freight directions failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message :
                                          'Unable to load directions',
          });
        }
      },
  );

  server.post(
      '/freight/:id/complete',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;

        const load = await findFreightLoad(prisma, userId, id);
        if (!load)
          return reply.status(404).send({error: 'Freight load not found'});
        if (load.status === LifecycleStatus.COMPLETED)
          return reply.status(400).send({error: 'Load already completed'});

        const costDecimal = new Prisma.Decimal(load.cost);
        try {
          const {
            nextBalance,
            updated
          } = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique(
                {where: {id: userId}, select: {k3h4CoinBalance: true}});
            if (!user) throw new Error('User not found');

            const nextBalance = user.k3h4CoinBalance.sub(costDecimal);
            const savedUser = await tx.user.update(
                {where: {id: userId}, data: {k3h4CoinBalance: nextBalance}});
            await recordBankTransactionEntity(tx, {
              userId,
              amount: costDecimal,
              direction: EntityDirection.DEBIT,
              kind: EntityKind.FREIGHT_PAYMENT,
              note: `Freight load ${load.title}`,
              balanceAfter: savedUser.k3h4CoinBalance,
              targetType: 'freight_load',
              targetId: load.id,
              name: load.title,
            });

            const updated = await markFreightLoadCompleted(tx, id);
            return {nextBalance, updated};
          });

          await rt({
            eventType: 'freight.complete',
            source: 'api',
            payload: {id, cost: costDecimal.toFixed(2)}
          });

          return {load: serializeLoad(updated)};
        } catch (err) {
          request.log.error({err}, 'freight completion failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to complete load'
          });
        }
      },
  );
}

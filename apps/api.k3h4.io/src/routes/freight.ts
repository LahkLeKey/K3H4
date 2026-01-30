import {LifecycleStatus, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {routeSignature} from '../lib/geo-signature';
import {fetchOsrm} from '../lib/osrm-client';
import {EntityDirection, EntityKind, recordBankTransactionEntity,} from '../services/bank-actor';

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

async function upsertGeoDirectionFromRoute(params: {
  prisma: PrismaClient; signature: string; userId: string;
  origin: {lat: number; lng: number};
  destination: {lat: number; lng: number};
  originName: string | null;
  destinationName: string | null;
  route: any;
}) {
  const {
    prisma,
    signature,
    userId,
    origin,
    destination,
    originName,
    destinationName,
    route,
  } = params;

  const stops =
      buildStops(
          origin, destination, originName ?? 'Origin',
          destinationName ?? 'Destination')
          .map((stop) => ({
                 ...stop,
                 latitude: new Prisma.Decimal(stop.latitude.toFixed(6)),
                 longitude: new Prisma.Decimal(stop.longitude.toFixed(6)),
               }));

  const steps = (route.legs ?? []).flatMap((leg: any) => leg.steps ?? []);
  const segments =
      buildSegments(steps, origin, destination)
          .map((segment) => ({
                 ...segment,
                 distanceMeters:
                     new Prisma.Decimal(segment.distanceMeters.toFixed(3)),
                 startLat: new Prisma.Decimal(segment.startLat.toFixed(6)),
                 startLng: new Prisma.Decimal(segment.startLng.toFixed(6)),
                 endLat: new Prisma.Decimal(segment.endLat.toFixed(6)),
                 endLng: new Prisma.Decimal(segment.endLng.toFixed(6)),
               }));

  const shared = {
    userId,
    provider: 'osrm',
    profile: 'driving',
    inputPoints: [
      {label: 'origin', lat: origin.lat, lng: origin.lng, name: originName},
      {
        label: 'destination',
        lat: destination.lat,
        lng: destination.lng,
        name: destinationName
      },
    ],
    originLat: new Prisma.Decimal(origin.lat.toFixed(6)),
    originLng: new Prisma.Decimal(origin.lng.toFixed(6)),
    destinationLat: new Prisma.Decimal(destination.lat.toFixed(6)),
    destinationLng: new Prisma.Decimal(destination.lng.toFixed(6)),
    distanceMeters: new Prisma.Decimal((route.distance ?? 0).toFixed(3)),
    durationSeconds:
        Number.isFinite(route.duration) ? Math.round(route.duration) : null,
    geometry: route.geometry ?? null,
    instructions: route.legs ?? [],
    payload: route,
    expiresAt: new Date(Date.now() + ROUTE_TTL_MS),
  };

  await prisma.geoDirection.upsert({
    where: {signature},
    update: {
      ...shared,
      stops: {deleteMany: {}, create: stops},
      segments: {deleteMany: {}, create: segments},
    },
    create: {
      signature,
      ...shared,
      stops: {create: stops},
      segments: {create: segments},
    },
  });
}

type EnsureGeoDirectionParams = {
  prisma: PrismaClient; userId: string; signature: string;
  origin: {lat: number; lng: number};
  destination: {lat: number; lng: number};
  originName: string | null;
  destinationName: string | null;
  osrmResponse?: OsrmRouteDetails;
};

async function ensureGeoDirectionForLoad(params: EnsureGeoDirectionParams) {
  const include = {
    stops: {orderBy: {sequence: 'asc'}},
    segments: {orderBy: {sequence: 'asc'}},
  } as const;
  const existing = await params.prisma.geoDirection.findUnique({
    where: {signature: params.signature},
    include,
  });
  if (existing) return existing;
  const osrmDetails = params.osrmResponse ??
      await fetchOsrmRoute(params.origin, params.destination);
  await upsertGeoDirectionFromRoute({
    prisma: params.prisma,
    signature: params.signature,
    userId: params.userId,
    origin: params.origin,
    destination: params.destination,
    originName: params.originName,
    destinationName: params.destinationName,
    route: osrmDetails.route,
  });
  return params.prisma.geoDirection.findUnique(
      {where: {signature: params.signature}, include});
}

const decimalToNumber = (value: Prisma.Decimal|null|undefined) =>
    value === null || value === undefined ? null : Number(value);

const mapDirectionResponse = (direction: any) => ({
  signature: direction.signature,
  provider: direction.provider,
  profile: direction.profile,
  geometry: direction.geometry ?? null,
  originLat: decimalToNumber(direction.originLat),
  originLng: decimalToNumber(direction.originLng),
  destinationLat: decimalToNumber(direction.destinationLat),
  destinationLng: decimalToNumber(direction.destinationLng),
  distanceMeters: decimalToNumber(direction.distanceMeters),
  durationSeconds: direction.durationSeconds,
  stops: (direction.stops ?? []).map((stop: any) => ({
                                       id: stop.id,
                                       sequence: stop.sequence,
                                       latitude: Number(stop.latitude),
                                       longitude: Number(stop.longitude),
                                       label: stop.label,
                                       address: stop.address,
                                       source: stop.source,
                                       metadata: stop.metadata ?? null,
                                     })),
  segments: (direction.segments ??
             []).map((segment: any) => ({
                       id: segment.id,
                       sequence: segment.sequence,
                       instruction: segment.instruction,
                       maneuverType: segment.maneuverType,
                       maneuverModifier: segment.maneuverModifier,
                       distanceMeters: Number(segment.distanceMeters),
                       durationSeconds: segment.durationSeconds,
                       startLat: Number(segment.startLat),
                       startLng: Number(segment.startLng),
                       endLat: Number(segment.endLat),
                       endLng: Number(segment.endLng),
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
        const loads = await prisma.freightLoad.findMany(
            {where: {userId}, orderBy: {createdAt: 'desc'}});
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

        const load = await prisma.freightLoad.create({
          data: {
            userId,
            title: body?.title?.trim() || 'Freight load',
            originName: originLabel,
            originLat,
            originLng,
            destinationName: destinationLabel,
            destinationLat,
            destinationLng,
            distanceKm: new Prisma.Decimal(distance.toFixed(2)),
            durationMinutes: osrm.durationMinutes,
            cost,
            status: LifecycleStatus.PLANNING,
            routeGeoJson: osrm.geometry,
          },
        });

        const signature = routeSignature(
            {lat: originLat, lng: originLng},
            {lat: destinationLat, lng: destinationLng});
        try {
          await ensureGeoDirectionForLoad({
            prisma,
            userId,
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

        const load = await prisma.freightLoad.findFirst({where: {id, userId}});
        if (!load)
          return reply.status(404).send({error: 'Freight load not found'});

        const signature = routeSignature(
            {lat: Number(load.originLat), lng: Number(load.originLng)}, {
              lat: Number(load.destinationLat),
              lng: Number(load.destinationLng)
            });
        try {
          const direction = await ensureGeoDirectionForLoad({
            prisma,
            userId,
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

        const load = await prisma.freightLoad.findFirst({where: {id, userId}});
        if (!load)
          return reply.status(404).send({error: 'Freight load not found'});
        if (load.status === LifecycleStatus.COMPLETED)
          return reply.status(400).send({error: 'Load already completed'});

        try {
          const {
            nextBalance,
            updated
          } = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique(
                {where: {id: userId}, select: {k3h4CoinBalance: true}});
            if (!user) throw new Error('User not found');

            const cost = new Prisma.Decimal(load.cost.toFixed(2));
            const nextBalance = user.k3h4CoinBalance.sub(cost);
            const savedUser = await tx.user.update(
                {where: {id: userId}, data: {k3h4CoinBalance: nextBalance}});
            await recordBankTransactionEntity(tx, {
              userId,
              amount: cost,
              direction: EntityDirection.DEBIT,
              kind: EntityKind.FREIGHT_PAYMENT,
              note: `Freight load ${load.title}`,
              balanceAfter: savedUser.k3h4CoinBalance,
              targetType: 'freight_load',
              targetId: load.id,
              name: load.title,
            });

            const updated = await tx.freightLoad.update(
                {where: {id}, data: {status: LifecycleStatus.COMPLETED}});
            return {nextBalance, updated};
          });

          await rt({
            eventType: 'freight.complete',
            source: 'api',
            payload: {id, cost: load.cost.toFixed(2)}
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

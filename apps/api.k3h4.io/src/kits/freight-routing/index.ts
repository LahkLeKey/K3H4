import type {GeoCoreKit, GeoPoint} from '../geo-core';
import {routeSignature} from '../../lib/geo-signature';

const ROUTE_TTL_MS = 1000 * 60 * 60 * 6;

export type FreightLoad = {
  id: string;
  title: string;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  durationMinutes: number|null;
  cost: number;
  status: string;
  routeGeoJson: unknown|null;
  createdAt: Date;
  updatedAt: Date;
};

export type PlanFreightLoadCommand = {
  userId: string;
  title: string;
  originName: string;
  origin: GeoPoint;
  destinationName: string;
  destination: GeoPoint;
  ratePerKm: number;
};

export type FreightDirectionStop = {
  sequence: number;
  latitude: number;
  longitude: number;
  label: string|null;
  address: string|null;
  source: string|null;
  metadata: unknown;
};

export type FreightDirectionSegment = {
  sequence: number;
  instruction: string|null;
  maneuverType: string|null;
  maneuverModifier: string|null;
  distanceMeters: number|null;
  durationSeconds: number|null;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  geometry: unknown;
  metadata: unknown;
};

export type FreightDirection = {
  signature: string;
  userId: string;
  provider: string;
  profile: string;
  geometry: unknown;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  distanceMeters: number|null;
  durationSeconds: number|null;
  route: unknown;
  stops: FreightDirectionStop[];
  segments: FreightDirectionSegment[];
  fetchedAt?: string;
  expiresAt?: string;
};

export type FreightDirectionResponse = Omit<FreightDirection, 'userId'|'route'|'fetchedAt'|'expiresAt'|'stops'|'segments'>&{
  stops: Array<FreightDirectionStop&{id: string}>;
  segments: Array<FreightDirectionSegment&{id: string}>;
};

export type OsrmFreightRoute = {
  distance: number;
  duration: number;
  geometry: unknown;
  legs?: Array<{steps?: unknown[]}>;
};

export interface FreightRoutingHost {
  listLoads(userId: string): Promise<FreightLoad[]>;
  createLoad(command: {
    userId: string;
    title: string;
    originName: string;
    origin: GeoPoint;
    destinationName: string;
    destination: GeoPoint;
    distanceKm: number;
    durationMinutes: number|null;
    cost: string;
    routeGeoJson: unknown;
  }): Promise<FreightLoad>;
  findLoad(userId: string, loadId: string): Promise<FreightLoad|null>;
  completeLoadAtomically(
      userId: string, load: FreightLoad): Promise<FreightLoad>;
  resolveGeoActorId(userId: string): Promise<string>;
  readDirection(actorId: string, signature: string): Promise<FreightDirection|null>;
  writeDirection(actorId: string, direction: FreightDirection): Promise<void>;
  fetchDirections(origin: GeoPoint, destination: GeoPoint): Promise<OsrmFreightRoute>;
  now(): Date;
}

export interface FreightRoutingKit {
  listLoads(userId: string): Promise<FreightLoad[]>;
  getLoad(userId: string, loadId: string): Promise<FreightLoad|null>;
  planLoad(command: PlanFreightLoadCommand): Promise<FreightLoad>;
  getDirections(userId: string, loadId: string): Promise<FreightDirectionResponse>;
  completeLoad(userId: string, loadId: string): Promise<FreightLoad>;
}

export class FreightLoadNotFoundError extends Error {}
export class FreightLoadAlreadyCompletedError extends Error {}

const instructionFor = (step: any) => {
  const maneuver = step?.maneuver ?? {};
  if (typeof maneuver.instruction === 'string' &&
      maneuver.instruction.trim().length) {
    return maneuver.instruction;
  }
  const parts: string[] = [];
  if (maneuver.modifier) parts.push(`${maneuver.modifier} turn`);
  else if (maneuver.type) parts.push(maneuver.type);
  const name = typeof step?.name === 'string' ? step.name.trim() : '';
  if (name) parts.push(`onto ${name}`);
  return parts.length ? parts.join(' ') : 'Continue';
};

const normalizeDirections = (
    userId: string, signature: string, origin: GeoPoint,
    destination: GeoPoint, originName: string, destinationName: string,
    route: OsrmFreightRoute, now: Date): FreightDirection => {
  const steps = (route.legs ?? []).flatMap((leg) => leg.steps ?? []);
  const segments = steps.map((step: any, sequence) => {
    const start = step?.maneuver?.location;
    const next = steps[sequence + 1] as any;
    const end = next?.maneuver?.location ?? [destination.lng, destination.lat];
    return {
      sequence,
      instruction: instructionFor(step),
      maneuverType: step?.maneuver?.type ?? null,
      maneuverModifier: step?.maneuver?.modifier ?? null,
      distanceMeters: Number.isFinite(step?.distance) ? step.distance : null,
      durationSeconds: Number.isFinite(step?.duration) ?
          Math.round(step.duration) :
          null,
      startLat: Number.isFinite(start?.[1]) ? start[1] : origin.lat,
      startLng: Number.isFinite(start?.[0]) ? start[0] : origin.lng,
      endLat: Number.isFinite(end?.[1]) ? end[1] : destination.lat,
      endLng: Number.isFinite(end?.[0]) ? end[0] : destination.lng,
      geometry: step?.geometry ?? null,
      metadata: step ?? null,
    };
  });
  return {
    signature,
    userId,
    provider: 'osrm',
    profile: 'driving',
    geometry: route.geometry ?? null,
    originLat: origin.lat,
    originLng: origin.lng,
    destinationLat: destination.lat,
    destinationLng: destination.lng,
    distanceMeters: Number.isFinite(route.distance) ? route.distance : null,
    durationSeconds: Number.isFinite(route.duration) ?
        Math.round(route.duration) :
        null,
    route,
    stops: [
      {
        sequence: 0,
        latitude: origin.lat,
        longitude: origin.lng,
        label: originName,
        address: originName,
        source: 'freight',
        metadata: {role: 'origin'},
      },
      {
        sequence: 1,
        latitude: destination.lat,
        longitude: destination.lng,
        label: destinationName,
        address: destinationName,
        source: 'freight',
        metadata: {role: 'destination'},
      },
    ],
    segments,
    fetchedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ROUTE_TTL_MS).toISOString(),
  };
};

const toDirectionResponse =
    (direction: FreightDirection): FreightDirectionResponse => ({
      signature: direction.signature,
      provider: direction.provider,
      profile: direction.profile,
      geometry: direction.geometry ?? null,
      originLat: Number(direction.originLat),
      originLng: Number(direction.originLng),
      destinationLat: Number(direction.destinationLat),
      destinationLng: Number(direction.destinationLng),
      distanceMeters: direction.distanceMeters,
      durationSeconds: direction.durationSeconds,
      stops: direction.stops.map((stop) => ({
        ...stop,
        id: `${direction.signature}:stop:${stop.sequence}`,
        metadata: stop.metadata ?? null,
      })),
      segments: direction.segments.map((segment) => ({
        ...segment,
        id: `${direction.signature}:segment:${segment.sequence}`,
        geometry: segment.geometry ?? null,
        metadata: segment.metadata ?? null,
      })),
    });

export const createFreightRoutingKit = (dependencies: {
  geoCore: Pick<GeoCoreKit, 'resolveRoute'>;
  host: FreightRoutingHost;
}): FreightRoutingKit => {
  const ensureDirections = async (
      userId: string, actorId: string, origin: GeoPoint,
      destination: GeoPoint, originName: string, destinationName: string) => {
    const signature = routeSignature(origin, destination);
    const cached = await dependencies.host.readDirection(actorId, signature);
    if (cached) return cached;
    const route = await dependencies.host.fetchDirections(origin, destination);
    const direction = normalizeDirections(
        userId, signature, origin, destination, originName, destinationName,
        route, dependencies.host.now());
    await dependencies.host.writeDirection(actorId, direction);
    return direction;
  };

  return {
    listLoads: (userId) => dependencies.host.listLoads(userId),
    getLoad: (userId, loadId) => dependencies.host.findLoad(userId, loadId),
    async planLoad(command) {
      const actorId = await dependencies.host.resolveGeoActorId(command.userId);
      const route = await dependencies.geoCore.resolveRoute({
        actorId,
        origin: command.origin,
        destination: command.destination,
      });
      const load = await dependencies.host.createLoad({
        ...command,
        title: command.title.trim() || 'Freight load',
        originName: command.originName.trim() || 'Origin',
        destinationName: command.destinationName.trim() || 'Destination',
        distanceKm: Number(route.distanceKm.toFixed(2)),
        durationMinutes: route.durationMinutes,
        cost: (route.distanceKm * command.ratePerKm).toFixed(2),
        routeGeoJson: route.geojson,
      });
      await ensureDirections(
          command.userId, actorId, command.origin, command.destination,
          load.originName, load.destinationName);
      return load;
    },
    async getDirections(userId, loadId) {
      const load = await dependencies.host.findLoad(userId, loadId);
      if (!load) throw new FreightLoadNotFoundError('Freight load not found');
      const actorId = await dependencies.host.resolveGeoActorId(userId);
      const direction = await ensureDirections(
          userId, actorId,
          {lat: load.originLat, lng: load.originLng},
          {lat: load.destinationLat, lng: load.destinationLng},
          load.originName.trim() || 'Origin',
          load.destinationName.trim() || 'Destination');
      return toDirectionResponse(direction);
    },
    async completeLoad(userId, loadId) {
      const load = await dependencies.host.findLoad(userId, loadId);
      if (!load) throw new FreightLoadNotFoundError('Freight load not found');
      if (load.status === 'completed') {
        throw new FreightLoadAlreadyCompletedError('Load already completed');
      }
      return dependencies.host.completeLoadAtomically(userId, load);
    },
  };
};
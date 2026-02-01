import {createHash} from 'node:crypto';

import type {IncludeFlags, OriginPoint, PoiId, PoiType} from './types';

const INCLUDE_ALL: Array<keyof IncludeFlags> = [
  'address',
  'contact',
  'openingHours',
  'fuel',
  'accessibility',
  'building',
  'route',
  'routeGeometry',
  'photos',
  'description',
];

export const DEFAULT_INCLUDE_FLAGS: IncludeFlags = {
  address: true,
  contact: true,
  openingHours: true,
  fuel: true,
  accessibility: true,
  building: true,
  route: true,
  routeGeometry: false,
  photos: true,
  description: true,
};

export function parsePoiId(raw: string|undefined|null): PoiId|null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const match = /^(node|way|relation)[/:]?([0-9]+)$/i.exec(trimmed);
  if (!match) return null;
  const type = match[1].toLowerCase() as PoiType;
  const id = Number(match[2]);
  if (!Number.isFinite(id)) return null;
  return {type, id};
}

export function parseIncludeFlags(raw: unknown): IncludeFlags {
  if (!raw) return {...DEFAULT_INCLUDE_FLAGS};
  const list = Array.isArray(raw) ?
      raw :
      typeof raw === 'string' ?
      raw.split(',').map((v) => v.trim()).filter(Boolean) :
      [];

  if (list.length === 0 || list.includes('all'))
    return {...DEFAULT_INCLUDE_FLAGS};

  const normalized = new Set(list.map((v) => v.toLowerCase()));
  const flags: IncludeFlags = {
    address: normalized.has('address'),
    contact: normalized.has('contact'),
    openingHours: normalized.has('openinghours'),
    fuel: normalized.has('fuel'),
    accessibility: normalized.has('accessibility'),
    building: normalized.has('building'),
    route: normalized.has('route'),
    routeGeometry:
        normalized.has('routegeometry') || normalized.has('geometry'),
    photos: normalized.has('photos'),
    description: normalized.has('description') || normalized.has('photos'),
  };

  // Always include name/category base info implicitly; ensure at least photos
  // implies description
  return flags;
}

export function parseFreshFlag(raw: unknown): boolean {
  if (raw === true) return true;
  if (typeof raw === 'string') {
    const normalized = raw.trim().toLowerCase();
    return normalized === 'true' || normalized === '1';
  }
  return false;
}

export function parseOrigin(query: Record<string, unknown>): OriginPoint|null {
  const lat = Number(query.originLat ?? query.lat ?? query.latitude);
  const lon =
      Number(query.originLon ?? query.lon ?? query.longitude ?? query.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {lat, lon};
}

export function computeIncludeHash(
    flags: IncludeFlags, origin: OriginPoint|null, mode: string): string {
  const payload = {
    include: INCLUDE_ALL.reduce(
        (acc, key) => {
          acc[key] = flags[key];
          return acc;
        },
        {} as Record<string, boolean>),
    origin,
    mode,
  };
  const hash = createHash('sha256');
  hash.update(JSON.stringify(payload));
  return hash.digest('hex');
}

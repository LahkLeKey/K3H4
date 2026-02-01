import type {PrismaClient} from '@prisma/client';
import type {LineString, MultiPolygon, Polygon} from 'geojson';
import {URLSearchParams} from 'node:url';

import {enqueueOverpass} from '../../lib/overpass-queue';
import {fetchOsrmWithCache} from '../osrm-cache';
import {fetchWikidataWithCache} from '../wikidata-cache';

import type {Address, BuildingInfo, EnrichedPoi, IncludeFlags, OriginPoint, Photo, PoiId,} from './types';

const OVERPASS_URL = process.env.OVERPASS_URL?.trim() ||
    'https://overpass-api.de/api/interpreter';
const NOMINATIM_URL = process.env.NOMINATIM_URL?.trim() ||
    'https://nominatim.openstreetmap.org/reverse';
const NOMINATIM_USER_AGENT =
    process.env.NOMINATIM_USER_AGENT?.trim() || 'k3h4-api/poi-enrich';
const WIKIMEDIA_LANG = process.env.WIKIMEDIA_LANG?.trim() || 'en';
const BUILDING_SEARCH_RADIUS_M = 10;

const extractCenter = (el: any) => {
  if (el?.center?.lat && el?.center?.lon)
    return {lat: Number(el.center.lat), lon: Number(el.center.lon)};
  if (Number.isFinite(el?.lat) && Number.isFinite(el?.lon))
    return {lat: Number(el.lat), lon: Number(el.lon)};
  return null;
};

const toFootprint = (el: any): Polygon|MultiPolygon|null => {
  const coords = Array.isArray(el?.geometry) ?
      el.geometry.map(
          (p: any) => [Number(p.lon), Number(p.lat)] as [number, number]) :
      null;
  if (!coords || coords.length === 0) return null;
  const closed = coords[0][0] === coords[coords.length - 1][0] &&
      coords[0][1] === coords[coords.length - 1][1];
  const ring = closed ? coords : [...coords, coords[0]];
  return {type: 'Polygon', coordinates: [ring]};
};

const pointInPolygon =
    (point: {lat: number; lon: number}, polygon: Polygon|null) => {
      if (!polygon) return false;
      const [ring] = polygon.coordinates;
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0];
        const yi = ring[i][1];
        const xj = ring[j][0];
        const yj = ring[j][1];
        const denom = yj - yi;
        if (Math.abs(denom) < 1e-12) continue;
        const intersect = yi > point.lat !== yj > point.lat &&
            point.lon < ((xj - xi) * (point.lat - yi)) / denom + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };

const extractAddressFromTags = (tags: Record<string, any>|
                                undefined): Address|null => {
  if (!tags) return null;
  const anyAddr = Object.keys(tags).some((k) => k.startsWith('addr:'));
  if (!anyAddr) return null;
  const house_number = tags['addr:housenumber'] ?? null;
  const road = tags['addr:street'] ?? tags['addr:road'] ?? null;
  const neighborhood =
      tags['addr:neighbourhood'] ?? tags['addr:quarter'] ?? null;
  const city =
      tags['addr:city'] ?? tags['addr:town'] ?? tags['addr:village'] ?? null;
  const postcode = tags['addr:postcode'] ?? null;
  const country = tags['addr:country'] ?? null;
  const parts = [house_number, road, city, postcode, country].filter(Boolean);
  return {
    house_number,
    road,
    neighborhood,
    city,
    postcode,
    country,
    label: parts.length > 0 ? parts.join(', ') : null,
  };
};

const mergeAddress =
    (...addresses: Array<Address|null|undefined>): Address|null => {
      const merged: Address = {};
      for (const addr of addresses) {
        if (!addr) continue;
        merged.label = merged.label ?? addr.label ?? null;
        merged.house_number = merged.house_number ?? addr.house_number ?? null;
        merged.road = merged.road ?? addr.road ?? null;
        merged.neighborhood = merged.neighborhood ?? addr.neighborhood ?? null;
        merged.city = merged.city ?? addr.city ?? null;
        merged.postcode = merged.postcode ?? addr.postcode ?? null;
        merged.country = merged.country ?? addr.country ?? null;
      }
      if (Object.keys(merged).length === 0) return null;
      return merged;
    };

const mapBuildingType = (tags: Record<string, any>|undefined):
    {type?: string|null; subtype?: string | null} => {
      if (!tags) return {};
      const raw = tags.building as string | undefined;
      if (!raw) return {};
      if (raw === 'residential' || raw === 'apartments' || raw === 'house')
        return {type: 'residential', subtype: raw};
      if (raw === 'retail' || raw === 'commercial' || raw === 'office' ||
          raw === 'supermarket')
        return {type: 'commercial', subtype: raw};
      return {type: raw, subtype: raw};
    };

const extractFuelTypes =
    (tags: Record<string, any>|undefined): string[]|null => {
      if (!tags) return null;
      const fuels = Object.entries(tags)
                        .filter(
                            ([key, value]) => key.startsWith('fuel:') &&
                                `${value}`.toLowerCase() === 'yes')
                        .map(([key]) => key.replace('fuel:', ''));
      return fuels.length > 0 ? fuels : null;
    };

const extractContact = (tags: Record<string, any>|undefined):
    {phone?: string|null; website?: string | null}|null => {
      if (!tags) return null;
      const phone = tags.phone ?? tags['contact:phone'] ?? null;
      const website = tags.website ?? tags['contact:website'] ?? null;
      if (!phone && !website) return null;
      return {phone: phone ?? null, website: website ?? null};
    };

const buildOverpassElementQuery = (poi: PoiId) => {
  const query =
      `[out:json][timeout:25];(${poi.type}(${poi.id}););out tags center geom;`;
  const body = new URLSearchParams({data: query}).toString();
  const signature = `poi-enrich:${poi.type}:${poi.id}`;
  return {body, signature};
};

const buildOverpassBuildingQuery = (center: {lat: number; lon: number}) => {
  const query =
      `[out:json][timeout:25];way(around:${BUILDING_SEARCH_RADIUS_M},${
          center.lat},${center.lon})["building"];out tags geom;`;
  const body = new URLSearchParams({data: query}).toString();
  const signature =
      `poi-enrich:building:${center.lat.toFixed(6)}:${center.lon.toFixed(6)}`;
  return {body, signature};
};

const fetchOverpassElement = async (poi: PoiId) => {
  const {body, signature} = buildOverpassElementQuery(poi);
  const data = await enqueueOverpass(OVERPASS_URL, body, signature);
  const elements = Array.isArray((data as any)?.elements) ?
      ((data as any).elements as any[]) :
      [];
  return elements[0] ?? null;
};

const fetchContainingBuilding = async (center: {lat: number; lon: number}) => {
  const {body, signature} = buildOverpassBuildingQuery(center);
  const data = await enqueueOverpass(OVERPASS_URL, body, signature);
  const elements = Array.isArray((data as any)?.elements) ?
      ((data as any).elements as any[]) :
      [];
  return elements[0] ?? null;
};

const reverseGeocode =
    async(center: {lat: number; lon: number}): Promise<Address|null> => {
  const url = `${NOMINATIM_URL}?${new URLSearchParams({
                                    format: 'jsonv2',
                                    lat: String(center.lat),
                                    lon: String(center.lon),
                                    addressdetails: '1'
                                  }).toString()}`;
  const res = await fetch(url, {headers: {'User-Agent': NOMINATIM_USER_AGENT}});
  if (!res.ok) return null;
  const payload = await res.json().catch(() => null);
  if (!payload) return null;
  const addr = payload.address ?? {};
  return {
    label: payload.display_name ?? null,
    house_number: addr.house_number ?? null,
    road: addr.road ?? null,
    neighborhood: addr.suburb ?? addr.neighbourhood ?? null,
    city: addr.city ?? addr.town ?? addr.village ?? null,
    postcode: addr.postcode ?? null,
    country: addr.country ?? null,
  };
};

const extractWikipediaFromTag =
    (tags: Record<string, any>|undefined): {lang: string; title: string}|
    null => {
      if (!tags?.wikipedia) return null;
      const raw = `${tags.wikipedia}`;
      const [lang, ...rest] = raw.split(':');
      if (!lang || rest.length === 0) return null;
      return {lang, title: rest.join(':')};
    };

const fetchWikipediaSummary = async(
    wiki: {lang: string; title: string},
    ): Promise<{description: string | null; photo: Photo | null}> => {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'extracts|pageimages',
    exintro: '1',
    explaintext: '1',
    format: 'json',
    redirects: '1',
    piprop: 'original|thumbnail',
    pithumbsize: '640',
    titles: wiki.title,
  });
  const url =
      `https://${wiki.lang}.wikipedia.org/w/api.php?${params.toString()}`;
  const res = await fetch(url, {headers: {'User-Agent': NOMINATIM_USER_AGENT}});
  if (!res.ok) return {description: null, photo: null};
  const data = await res.json().catch(() => null);
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  const page: any = Array.isArray(pages) ? pages[0] : null;
  const description = page?.extract ?? null;
  const img = page?.original?.source ?? page?.thumbnail?.source ?? null;
  const photo =
      img ? ({url: img, caption: page?.title ?? null} as Photo) : null;
  return {description, photo};
};

const fetchCommonsImageUrl = async(fileName: string): Promise<string|null> => {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    titles: `File:${fileName}`
  });
  const url = `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
  const res = await fetch(url, {headers: {'User-Agent': NOMINATIM_USER_AGENT}});
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  const page: any = Array.isArray(pages) ? pages[0] : null;
  const info = page?.imageinfo?.[0];
  return info?.url ?? null;
};

const fetchWikidataDescriptionAndPhoto = async(
    prisma: PrismaClient,
    wikidataId: string,
    ): Promise<{description: string | null; photo: Photo | null}> => {
  const params = {
    action: 'wbgetentities',
    ids: wikidataId,
    props: 'labels|descriptions|claims',
    languages: WIKIMEDIA_LANG,
    format: 'json',
  } as const;

  const {payload} = await fetchWikidataWithCache<any>(
      prisma, '/w/api.php', params,
      {resource: 'poi-enrich', maxAgeMinutes: 60 * 24 * 7});
  const entity = payload?.entities?.[wikidataId];
  const description = entity?.descriptions?.[WIKIMEDIA_LANG]?.value ?? null;
  const claims = entity?.claims ?? {};
  const p18 = Array.isArray(claims.P18) ? claims.P18[0] : null;
  const imageTitle = p18?.mainsnak?.datavalue?.value as string | undefined;
  const url = imageTitle ? await fetchCommonsImageUrl(imageTitle) : null;
  const photo = url ? ({url, caption: imageTitle ?? null} as Photo) : null;
  return {description, photo};
};

export async function enrichPoi(
    prisma: PrismaClient,
    poi: PoiId,
    flags: IncludeFlags,
    origin: OriginPoint|null,
    mode: string,
    ): Promise<EnrichedPoi> {
  const base = await fetchOverpassElement(poi);
  if (!base) {
    const err = new Error('POI not found in OSM');
    (err as any).statusCode = 404;
    throw err;
  }

  const center = extractCenter(base);
  if (!center) {
    const err = new Error('POI has no coordinates');
    (err as any).statusCode = 502;
    throw err;
  }

  const tags = (base.tags ?? {}) as Record<string, any>;
  const name = tags.name ?? null;
  const category = tags.amenity ?? tags.shop ?? tags.tourism ?? tags.leisure ??
      tags.highway ?? null;
  const wikidataId = typeof tags.wikidata === 'string' ? tags.wikidata : null;
  const wikipediaTag = extractWikipediaFromTag(tags);

  let address = flags.address ? extractAddressFromTags(tags) : null;
  let buildingInfo: BuildingInfo|null = null;

  if (flags.building) {
    const isBuildingElement = typeof tags.building === 'string';
    const buildingSource =
        isBuildingElement ? base : await fetchContainingBuilding(center);
    if (buildingSource) {
      const footprint = toFootprint(buildingSource);
      const containsPoi = pointInPolygon(center, footprint as GeoJSON.Polygon);
      if (isBuildingElement || containsPoi) {
        const addrFromBuilding =
            extractAddressFromTags(buildingSource.tags ?? {});
        const {type, subtype} = mapBuildingType(buildingSource.tags ?? {});
        const levelsRaw = buildingSource.tags?.['building:levels'];
        const levels = levelsRaw ? Number(levelsRaw) : null;
        buildingInfo = {
          type: type ?? null,
          subtype: subtype ?? null,
          levels: Number.isFinite(levels) ? levels : null,
          footprint,
        };
        if (!address) address = addrFromBuilding ?? null;
      }
    }
  }

  if (flags.address && !address) {
    address = await reverseGeocode(center);
  }

  const contact = flags.contact ? extractContact(tags) : null;
  const openingHours = flags.openingHours ? (tags.opening_hours ?? null) : null;
  const fuelTypes = flags.fuel ? extractFuelTypes(tags) : null;
  const accessibility =
      flags.accessibility ? {wheelchair: tags.wheelchair ?? null} : null;

  let route = null;
  if (flags.route && origin) {
    const coordinates =
        `${origin.lon},${origin.lat};${center.lon},${center.lat}`;
    const params: Record<string, string|number|boolean> = {
      overview: flags.routeGeometry ? 'full' : 'false',
      alternatives: 0
    };
    if (flags.routeGeometry) params.geometries = 'geojson';

    const {response} = await fetchOsrmWithCache(
        prisma, {service: 'route', profile: mode, coordinates, params},
        {maxAgeMinutes: 5});
    if (response.ok && response.body?.routes?.length > 0) {
      const first = response.body.routes[0];
      route = {
        distance: Number(first.distance ?? 0),
        duration: Number(first.duration ?? 0),
        mode,
        geometry: flags.routeGeometry ? (first.geometry ?? null) : null,
      };
    }
  }

  let description: string|null = null;
  const photos: Photo[] = [];
  if (flags.photos || flags.description) {
    if (wikidataId) {
      const result = await fetchWikidataDescriptionAndPhoto(prisma, wikidataId);
      description = result.description ?? description;
      if (result.photo) photos.push(result.photo);
    }
    if ((!description || photos.length === 0) && wikipediaTag) {
      const {description: wikiDesc, photo} =
          await fetchWikipediaSummary(wikipediaTag);
      description = description ?? wikiDesc;
      if (photo) photos.push(photo);
    }
  }

  const payload: EnrichedPoi = {
    id: `${poi.type}/${poi.id}`,
    name,
    category,
    address: flags.address ? address ?? null : null,
    contact,
    openingHours,
    fuelTypes,
    accessibility,
    building: flags.building ? buildingInfo : null,
    route,
    description: flags.description ? description ?? null : null,
    photos: flags.photos ? (photos.length > 0 ? photos : null) : null,
    source: {
      osmId: `${poi.type}:${poi.id}`,
      wikidataId,
      lastUpdated: new Date().toISOString(),
    },
  };

  return payload;
}

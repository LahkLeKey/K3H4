import type {MultiPolygon, Polygon} from 'geojson';
import type maplibregl from 'maplibre-gl';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import type {Poi} from '../components/r3f-components/MapPinsOverlay';

import {buildApiUrl} from './lib/apiBase';
import {useDebouncedCallback} from './useDebouncedCallback';

export type PoiDetail = {
  id: string;
  name?: string | null;
  category?: string | null; lat: number; lng: number;
  address?: {
    label?: string | null;
    house_number?: string | null;
    road?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    postcode?: string | null;
    country?: string | null;
  } | null;
  contact?: {phone?: string | null; website?: string | null} | null;
  openingHours?: string | null;
  fuelTypes?: string[] | null;
  accessibility?: {wheelchair?: string | null} | null;
  description?: string | null;
  photos?: Array<{url: string; caption?: string | null}>| null;
  building?: {
    type?: string | null;
    subtype?: string | null;
    levels?: number | null;
    footprint?: Polygon | MultiPolygon | null;
  } | null;
  route?: {
    distance: number; duration: number; mode: string;
    geometry?: any | null
  } | null;
  source?: {
    osmId: string;
    wikidataId?: string | null;
    lastUpdated?: string | null
  } | null;
}|null;

export type PoiAnchor = {
  x: number; y: number; lat: number; lng: number
}|null;

type Options = {
  mapRef: React.RefObject<maplibregl.Map|null>; apiBase: string;
  accessToken?: string | null; signOut: () => void; poiPins: Poi[];
  frame: number;
  origin?: {lat: number; lng: number} | null;
};

const DETAIL_BASE_INCLUDE = [
  'address', 'contact', 'openingHours', 'fuel', 'accessibility', 'building',
  'photos', 'description'
];

const DETAIL_TTL_MS = 5 * 60_000;
const detailCache = new Map < string, {
  expiresAt: number;
  value?: PoiDetail;
  promise?: Promise<PoiDetail>
}
>();

const makeCacheKey = (id: string, include: string, origin: {
  lat: number; lng: number
}|null) => {
  if (origin)
    return `${id}:${include}:${origin.lat.toFixed(4)},${origin.lng.toFixed(4)}`;
  return `${id}:${include}`;
};

export function usePoiDetailInteraction(
    {mapRef, apiBase, accessToken, signOut, poiPins, frame, origin}: Options) {
  const [poiDetail, setPoiDetail] = useState<PoiDetail>(null);
  const [poiAnchor, setPoiAnchor] = useState<PoiAnchor>(null);
  const fetchingDetailRef = useRef<string|null>(null);
  const currentPoiDetailIdRef = useRef<string|null>(null);
  const originRef = useRef<{lat: number; lng: number}|null>(null);
  const poiPinsRef = useRef<Poi[]>(poiPins);

  useEffect(() => {
    const valid =
        origin && Number.isFinite(origin.lat) && Number.isFinite(origin.lng);
    originRef.current = valid ? origin : null;
  }, [origin]);

  useEffect(() => {
    poiPinsRef.current = poiPins;
  }, [poiPins]);

  const updateHighlight = useCallback((geometry: any|null) => {
    const map = mapRef.current;
    if (!map) return;
    const src =
        map.getSource('building-highlight') as maplibregl.GeoJSONSource |
        undefined;
    if (!src) return;
    const data = geometry ? {
      type: 'FeatureCollection',
      features: [{type: 'Feature', geometry, properties: {}}]
    } :
                            {type: 'FeatureCollection', features: []};
    src.setData(data as any);
  }, [mapRef]);

  const fetchPoiDetail = useCallback(
      async (poi: Poi) => {
        const authed = Boolean(accessToken);
        const {id} = poi;
        const originForRoute = originRef.current;
        const includeRoute = Boolean(originForRoute);
        const includeList =
            [...DETAIL_BASE_INCLUDE, ...(includeRoute ? ['route'] : [])];
        const include = includeList.join(',');
        const cacheKey = makeCacheKey(
            id, include,
            includeRoute && originForRoute ? originForRoute : null);

        const now = Date.now();
        const existing = detailCache.get(cacheKey);
        if (existing?.value && existing.expiresAt > now) return existing.value;
        if (existing?.promise) return await existing.promise;

        if (fetchingDetailRef.current === cacheKey) return null;
        fetchingDetailRef.current = cacheKey;

        const headers =
            accessToken ? {Authorization: `Bearer ${accessToken}`} : undefined;
        const osmId =
            poi.osmId && poi.osmType ? `${poi.osmType}/${poi.osmId}` : null;

        const request =
            (async () => {
              try {
                // Try enrichment first if we have an OSM identifier
                if (osmId) {
                  const qs = new URLSearchParams({include});
                  if (includeRoute && originForRoute) {
                    qs.set('originLat', String(originForRoute.lat));
                    qs.set('originLon', String(originForRoute.lng));
                  }

                  const enrichUrl = buildApiUrl(
                      apiBase,
                      `/api/poi/${osmId}/enrich?${qs.toString()}`,
                  );
                  const res = await fetch(
                      enrichUrl,
                      {headers: headers as any, credentials: 'include'});
                  if (res.status === 401 && authed) {
                    signOut();
                    return null;
                  }
                  if (res.ok) return (await res.json()) as any;
                  if (res.status !== 404)
                    throw new Error(`poi detail ${res.status}`);
                  // fall through to legacy if 404
                }

                const legacyUrl = buildApiUrl(
                    apiBase,
                    `${authed ? '/api/pois' : '/pois'}/${
                        id}?includeGeometry=true`,
                );
                const legacyRes = await fetch(
                    legacyUrl,
                    {headers: headers as any, credentials: 'include'});
                if (legacyRes.status === 401 && authed) {
                  signOut();
                  return null;
                }
                if (!legacyRes.ok)
                  throw new Error(`poi detail ${legacyRes.status}`);
                return (await legacyRes.json()) as any;
              } finally {
                fetchingDetailRef.current = null;
              }
            })()
                .then((value) => {
                  if (value) {
                    detailCache.set(
                        cacheKey,
                        {value, expiresAt: Date.now() + DETAIL_TTL_MS});
                  } else {
                    detailCache.delete(cacheKey);
                  }
                  return value as PoiDetail;
                })
                .catch((err) => {
                  detailCache.delete(cacheKey);
                  throw err;
                });

        detailCache.set(
            cacheKey, {promise: request, expiresAt: now + DETAIL_TTL_MS});
        return await request;
      },
      [accessToken, apiBase, signOut],
  );

  useEffect(() => {
    currentPoiDetailIdRef.current = poiDetail?.id ?? null;
  }, [poiDetail?.id]);

  const pickPoiAndFetch = useCallback(
      async (lngLat: {lng: number; lat: number}) => {
        const map = mapRef.current;
        const pins = poiPinsRef.current;
        if (!map || !pins.length) return;
        const clickPoint = map.project(lngLat);
        let nearest: Poi|null = null;
        let minDist = Infinity;
        for (const p of pins) {
          const pt = map.project([p.lng, p.lat]);
          const dx = pt.x - clickPoint.x;
          const dy = pt.y - clickPoint.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist) {
            minDist = d;
            nearest = p;
          }
        }
        if (!nearest || minDist > 28) return;
        if (currentPoiDetailIdRef.current === nearest.id) return;
        const rawDetail = await fetchPoiDetail(nearest);
        if (!rawDetail) return;

        const normalizeDetail = (d: PoiDetail) => {
          const tags = (d as any)?.tags ?? null;

          const address = d?.address ? d.address :
              tags                   ? {
                label: tags['addr:full'] ?? null,
                house_number:
                    tags['addr:housenumber'] ?? tags['addr:housename'] ?? null,
                road: tags['addr:street'] ?? null,
                city: tags['addr:city'] ?? null,
                postcode: tags['addr:postcode'] ?? null,
                country: tags['addr:country'] ?? null,
              } :
                     null;

          const contact = d?.contact ? d.contact :
              tags                   ? {
                phone: tags.phone ?? tags['contact:phone'] ?? null,
                website: tags.website ?? tags['brand:website'] ?? null,
              } :
                     null;

          const openingHours =
              d?.openingHours ?? (tags ? tags.opening_hours ?? null : null);
          const accessibility = d?.accessibility ??
              (tags?.wheelchair ? {wheelchair: tags.wheelchair} : null);

          const building = d?.building                           ? d.building :
              tags && (tags.building || tags['building:levels']) ? {
                type: tags.building ?? null,
                subtype: tags['building:use'] ?? null,
                levels: tags['building:levels'] ?
                    Number(tags['building:levels']) :
                    null,
                footprint: null,
              } :
                                                                   null;

          const source = d?.source ? d.source :
              tags                 ? {
                osmId: (d as any)?.osmId ?? null,
                wikidataId: tags['brand:wikidata'] ?? tags.wikidata ?? null,
                lastUpdated: null,
              } :
                     null;

          return {
            ...d,
            address,
            contact,
            openingHours,
            accessibility,
            building,
            source,
          } as PoiDetail;
        };

        const detail = normalizeDetail(rawDetail);

        const building = detail?.building ?? null;
        const footprint =
            building?.footprint ?? (building as any)?.geometry ?? null;
        updateHighlight(footprint);
        const projected = map.project([nearest.lng, nearest.lat]);
        setPoiAnchor({
          x: projected.x,
          y: projected.y,
          lat: nearest.lat,
          lng: nearest.lng
        });
        setPoiDetail({
          id: nearest.id,
          name: detail?.name ?? nearest.name ?? null,
          category: detail?.category ?? nearest.kind ?? null,
          lat: nearest.lat,
          lng: nearest.lng,
          address: detail?.address ?? null,
          contact: detail?.contact ?? null,
          openingHours: detail?.openingHours ?? null,
          fuelTypes: detail?.fuelTypes ?? null,
          accessibility: detail?.accessibility ?? null,
          description: detail?.description ?? null,
          photos: detail?.photos ?? null,
          building: building ? {
            type: building.type ?? null,
            subtype: building.subtype ?? null,
            levels: building.levels ?? null,
            footprint: footprint ?? null,
          } :
                               null,
          route: detail?.route ?? null,
          source: detail?.source ?? null,
        });
      },
      [fetchPoiDetail, mapRef, updateHighlight],
  );

  const debouncedHoverPick = useDebouncedCallback(
      (lng: number, lat: number) => pickPoiAndFetch({lng, lat}), 260);

  useEffect(() => debouncedHoverPick.cancel, [debouncedHoverPick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !poiAnchor) return;
    const p = map.project([poiAnchor.lng, poiAnchor.lat]);
    setPoiAnchor((prev) => (prev ? {...prev, x: p.x, y: p.y} : prev));
  }, [frame, mapRef, poiAnchor?.lat, poiAnchor?.lng]);

  const clearPoi = useCallback(() => {
    setPoiDetail(null);
    setPoiAnchor(null);
    updateHighlight(null);
  }, [updateHighlight]);

  return useMemo(
      () => ({
        poiDetail,
        poiAnchor,
        pickPoiAndFetch,
        debouncedHoverPick,
        clearPoi
      }),
      [clearPoi, debouncedHoverPick, pickPoiAndFetch, poiAnchor, poiDetail],
  );
}

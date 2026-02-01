import * as z from 'zod';

export const GeoResourceGet = z.enum(['route', 'history', 'prefs']);
export const GeoResourcePost = z.enum(['prefs', 'status']);

export const MaptilerKind = z.enum(['json', 'tiles']);

export const OsrmService =
    z.enum(['route', 'table', 'match', 'trip', 'nearest', 'tile']);

export const ChatResource = z.enum(['sessions', 'models', 'operations']);
export const ChatSubresource = z.enum(['messages']);

export const WikidataEntityType = z.enum(['items', 'properties']);
export const WikidataSubresource =
    z.enum(['statements', 'labels', 'sitelinks']);
export const WikidataSearchKind = z.enum(['items', 'properties']);

export const UsdaDataset = z.enum(['esr', 'gats', 'psd']);

export const UsdaResource = z.enum([
  'regions',
  'countries',
  'commodities',
  'units',
  'data-release',
  'exports',
  'hs6-commodities',
  'customs-districts',
  'census',
  'customs',
  'un',
  'commodity',
  'commodity-attributes',
]);

export const UsdaSubresource = z.enum([
  'all-countries',
  'by-country',
  'imports',
  'exports',
  'reexports',
  'data-release',
  'world',
]);

export const UsdaDetail = z.enum(['data-release']);

import type { PrismaClient } from "@prisma/client";
import type { LineString, MultiPolygon, Polygon } from "geojson";

export type PoiType = "node" | "way" | "relation";

export type PoiId = {
  type: PoiType;
  id: number;
};

export type IncludeFlags = {
  address: boolean;
  contact: boolean;
  openingHours: boolean;
  fuel: boolean;
  accessibility: boolean;
  building: boolean;
  route: boolean;
  routeGeometry: boolean;
  photos: boolean;
  description: boolean;
};

export type OriginPoint = {
  lat: number;
  lon: number;
};

export type Address = {
  label?: string | null;
  house_number?: string | null;
  road?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  postcode?: string | null;
  country?: string | null;
};

export type Contact = {
  phone?: string | null;
  website?: string | null;
};

export type BuildingInfo = {
  type?: string | null;
  subtype?: string | null;
  levels?: number | null;
  footprint?: Polygon | MultiPolygon | null;
};

export type RouteInfo = {
  distance: number;
  duration: number;
  mode: string;
  geometry?: LineString | null;
};

export type Photo = {
  url: string;
  caption?: string | null;
};

export type EnrichedPoi = {
  id: string;
  name: string | null;
  category: string | null;
  address?: Address | null;
  contact?: Contact | null;
  openingHours?: string | null;
  fuelTypes?: string[] | null;
  accessibility?: { wheelchair?: string | null } | null;
  building?: BuildingInfo | null;
  route?: RouteInfo | null;
  description?: string | null;
  photos?: Photo[] | null;
  source?: { osmId: string; wikidataId?: string | null; lastUpdated: string };
};

export type PrismaWithEnrichmentCache = PrismaClient;

export type PrismaClientLike = {
  $transaction: PrismaClient["$transaction"];
};

-- Make Actor.type a plain text column (previously enum-based)
ALTER TABLE "Actor"
  ALTER COLUMN "type" TYPE TEXT USING "type"::text;

-- Drop old POI/geo-specific indexes
DROP INDEX IF EXISTS "actor_poi_osm_unique";
DROP INDEX IF EXISTS "Actor_latitude_longitude_idx";

-- Remove geo-specific columns from Actor
ALTER TABLE "Actor"
  DROP COLUMN IF EXISTS "osmType",
  DROP COLUMN IF EXISTS "osmId",
  DROP COLUMN IF EXISTS "latitude",
  DROP COLUMN IF EXISTS "longitude";

-- Drop legacy enum types if they still exist
DROP TYPE IF EXISTS "ActorType";
DROP TYPE IF EXISTS "EntityKind";
DROP TYPE IF EXISTS "EntityDirection";
DROP TYPE IF EXISTS "LifecycleStatus";
DROP TYPE IF EXISTS "EngagementPriority";
DROP TYPE IF EXISTS "CoverageStatus";
DROP TYPE IF EXISTS "WarehouseCategory";
DROP TYPE IF EXISTS "ChatRole";
DROP TYPE IF EXISTS "BuildingType";

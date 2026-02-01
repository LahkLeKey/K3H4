-- Make Actor.type a plain text column (previously enum-based)
ALTER TABLE "Actor"
  ALTER COLUMN "type" TYPE TEXT USING "type"::text;

-- Make Entity.kind and Entity.direction plain text columns (previously enum-based)
ALTER TABLE "Entity"
  ALTER COLUMN "kind" TYPE TEXT USING "kind"::text,
  ALTER COLUMN "direction" TYPE TEXT USING "direction"::text;

-- Drop old POI/geo-specific indexes
DROP INDEX IF EXISTS "actor_poi_osm_unique";
DROP INDEX IF EXISTS "Actor_latitude_longitude_idx";

-- Remove geo-specific columns from Actor
ALTER TABLE "Actor"
  DROP COLUMN IF EXISTS "osmType",
  DROP COLUMN IF EXISTS "osmId",
  DROP COLUMN IF EXISTS "latitude",
  DROP COLUMN IF EXISTS "longitude";


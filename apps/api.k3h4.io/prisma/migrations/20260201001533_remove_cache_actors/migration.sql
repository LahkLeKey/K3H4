/*
  Warnings:

  - You are about to drop the `EnrichmentCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WikidataCacheEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActorType" ADD VALUE 'wikidata-cache';
ALTER TYPE "ActorType" ADD VALUE 'enrichment-cache';

-- Ensure a shared enrichment cache actor exists for migrating legacy rows.
INSERT INTO "Actor" ("id", "label", "type", "source", "createdAt", "updatedAt")
SELECT
  md5(random()::text || clock_timestamp()::text),
  'Enrichment Cache',
  'enrichment-cache',
  'enrichment-cache',
  now(),
  now()
WHERE NOT EXISTS(
  SELECT 1
  FROM "Actor"
  WHERE "type" = 'enrichment-cache'
    AND "source" = 'enrichment-cache'
);

-- Migrate existing enrichment cache entries into the actor cache ledger.
WITH enrichment_actor AS (
  SELECT "id"
  FROM "Actor"
  WHERE "type" = 'enrichment-cache'
    AND "source" = 'enrichment-cache'
  LIMIT 1
),
legacy_cache AS (
  SELECT
    *,
    jsonb_build_object(
        'payload', "payload",
        'wikidataId', "wikidataId",
        'status', "status",
        'fetchedAt', "fetchedAt",
        'note', "note",
        'paramsHash', "paramsHash"
    ) AS cache_payload,
    jsonb_build_object(
        'provider', "provider",
        'namespace', "namespace",
        'kind', "kind",
        'sourceKey', "sourceKey"
    )::text AS cache_key
  FROM "EnrichmentCache"
)
INSERT INTO "ActorCache" ("id", "actorId", "key", "payload", "expiresAt", "createdAt", "updatedAt")
SELECT
  md5("legacy_cache"."cache_key" || "legacy_cache"."id"::text),
  enrichment_actor."id",
  "legacy_cache"."cache_key",
  "legacy_cache"."cache_payload",
  "legacy_cache"."expiresAt",
  now(),
  now()
FROM legacy_cache
CROSS JOIN enrichment_actor
ON CONFLICT ("actorId", "key") DO UPDATE
  SET "payload" = EXCLUDED."payload",
      "expiresAt" = EXCLUDED."expiresAt",
      "updatedAt" = EXCLUDED."updatedAt";

-- DropTable
DROP TABLE "EnrichmentCache";

-- DropTable
DROP TABLE "WikidataCacheEntry";

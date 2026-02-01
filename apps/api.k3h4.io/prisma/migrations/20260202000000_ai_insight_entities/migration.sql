-- Add AI insight actor/entity enums, migrate existing AiInsight rows, and drop the legacy table.

ALTER TYPE "ActorType" ADD VALUE 'ai-insight';
ALTER TYPE "EntityKind" ADD VALUE 'ai_insight';

INSERT INTO "Actor" ("id", "userId", "label", "type", "source", "createdAt", "updatedAt")
SELECT
  md5(random()::text || clock_timestamp()::text),
  "userId",
  'AI Insight Ledger',
  'ai-insight',
  'k3h4-ai',
  now(),
  now()
FROM (
  SELECT DISTINCT "userId"
  FROM "AiInsight"
) AS existing
WHERE NOT EXISTS(
  SELECT 1
  FROM "Actor"
  WHERE "userId" = existing."userId" AND "type" = 'ai-insight'
);

INSERT INTO "Entity" ("id", "actorId", "kind", "targetType", "targetId", "source", "name", "metadata", "createdAt", "updatedAt")
SELECT
  ai."id",
  actor."id",
  'ai_insight',
  ai."targetType",
  ai."targetId",
  'k3h4-ai',
  NULLIF(TRIM(ai."description"), ''),
  jsonb_build_object(
    'description', ai."description",
    'metadata', ai."metadata",
    'payload', ai."payload",
    'targetLabel', ai."targetLabel"
  ),
  ai."createdAt",
  ai."updatedAt"
FROM "AiInsight" ai
JOIN "Actor" actor
  ON actor."userId" = ai."userId"
  AND actor."type" = 'ai-insight';

DROP TABLE "AiInsight";

-- Migrate the legacy OllamaOperation rows into the actor/entity ledger and drop the legacy table.

INSERT INTO "Actor" ("id", "userId", "label", "type", "source", "createdAt", "updatedAt")
SELECT
  md5(random()::text || clock_timestamp()::text),
  "userId",
  'Ollama Operations',
  'ai-operation',
  'k3h4-ollama',
  now(),
  now()
FROM (
  SELECT DISTINCT "userId"
  FROM "OllamaOperation"
) AS existing
WHERE NOT EXISTS(
  SELECT 1
  FROM "Actor"
  WHERE "userId" = existing."userId" AND "type" = 'ai-operation'
);

INSERT INTO "Entity" ("id", "actorId", "kind", "targetType", "targetId", "source", "name", "metadata", "createdAt", "updatedAt")
SELECT
  o."id",
  actor."id",
  'ollama_operation',
  CASE WHEN o."sessionId" IS NOT NULL THEN 'chat-session' ELSE NULL END,
  o."sessionId",
  o."source",
  NULLIF(TRIM(o."model"), ''),
  jsonb_build_object(
    'temperature', o."temperature",
    'systemPrompt', o."systemPrompt",
    'requestBody', o."requestBody",
    'responseBody', o."responseBody",
    'statusCode', o."statusCode",
    'errorMessage', o."errorMessage",
    'metadata', o."metadata"
  ),
  o."createdAt",
  o."updatedAt"
FROM "OllamaOperation" o
JOIN "Actor" actor
  ON actor."userId" = o."userId"
  AND actor."type" = 'ai-operation';

DROP TABLE "OllamaOperation";

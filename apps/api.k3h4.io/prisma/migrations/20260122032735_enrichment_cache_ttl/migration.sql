-- CreateTable
CREATE TABLE "EnrichmentCache" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'wikidata',
    "namespace" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "paramsHash" TEXT,
    "wikidataId" TEXT,
    "payload" JSONB,
    "status" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "note" TEXT,

    CONSTRAINT "EnrichmentCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EnrichmentCache_provider_fetchedAt_idx" ON "EnrichmentCache"("provider", "fetchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "EnrichmentCache_provider_namespace_kind_sourceKey_key" ON "EnrichmentCache"("provider", "namespace", "kind", "sourceKey");

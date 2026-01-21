-- CreateTable
CREATE TABLE "PoiEnrichmentCache" (
    "id" TEXT NOT NULL,
    "includeHash" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoiEnrichmentCache_pkey" PRIMARY KEY ("id","includeHash")
);

-- CreateIndex
CREATE INDEX "PoiEnrichmentCache_expiresAt_idx" ON "PoiEnrichmentCache"("expiresAt");

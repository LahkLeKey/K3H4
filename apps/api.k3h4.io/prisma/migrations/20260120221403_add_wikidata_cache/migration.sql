-- CreateTable
CREATE TABLE "WikidataCacheEntry" (
    "id" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "params" JSONB,
    "paramsHash" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "payload" JSONB,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "cacheControlSeconds" INTEGER,
    "etag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WikidataCacheEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WikidataCacheEntry_resource_fetchedAt_idx" ON "WikidataCacheEntry"("resource", "fetchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WikidataCacheEntry_resource_endpoint_paramsHash_key" ON "WikidataCacheEntry"("resource", "endpoint", "paramsHash");

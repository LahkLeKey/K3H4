-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "maptilerLanguage" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "maptilerLastFetchedAt" TIMESTAMP(3),
ADD COLUMN     "maptilerLastKind" TEXT,
ADD COLUMN     "maptilerLastParams" JSONB,
ADD COLUMN     "maptilerLastPath" TEXT,
ADD COLUMN     "maptilerLastSignature" TEXT,
ADD COLUMN     "maptilerStyle" TEXT NOT NULL DEFAULT 'streets-v2';

-- CreateTable
CREATE TABLE "MaptilerQuery" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "signature" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "params" JSONB,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaptilerQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaptilerCacheEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "queryId" TEXT,
    "kind" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "params" JSONB,
    "paramsHash" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "responseType" TEXT NOT NULL DEFAULT 'json',
    "url" TEXT NOT NULL,
    "statusCode" INTEGER,
    "payload" JSONB,
    "data" BYTEA,
    "contentType" TEXT,
    "cacheControl" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaptilerCacheEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaptilerQuery_signature_key" ON "MaptilerQuery"("signature");

-- CreateIndex
CREATE INDEX "MaptilerQuery_userId_kind_idx" ON "MaptilerQuery"("userId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "MaptilerCacheEntry_signature_key" ON "MaptilerCacheEntry"("signature");

-- CreateIndex
CREATE INDEX "MaptilerCacheEntry_kind_path_idx" ON "MaptilerCacheEntry"("kind", "path");

-- CreateIndex
CREATE INDEX "MaptilerCacheEntry_expiresAt_idx" ON "MaptilerCacheEntry"("expiresAt");

-- AddForeignKey
ALTER TABLE "MaptilerQuery" ADD CONSTRAINT "MaptilerQuery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaptilerCacheEntry" ADD CONSTRAINT "MaptilerCacheEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaptilerCacheEntry" ADD CONSTRAINT "MaptilerCacheEntry_queryId_fkey" FOREIGN KEY ("queryId") REFERENCES "MaptilerQuery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "OsrmCacheEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "service" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "coordinates" TEXT,
    "params" JSONB,
    "paramsHash" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "statusCode" INTEGER,
    "payload" JSONB,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OsrmCacheEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OsrmCacheEntry_signature_key" ON "OsrmCacheEntry"("signature");

-- CreateIndex
CREATE INDEX "OsrmCacheEntry_service_profile_idx" ON "OsrmCacheEntry"("service", "profile");

-- CreateIndex
CREATE INDEX "OsrmCacheEntry_expiresAt_idx" ON "OsrmCacheEntry"("expiresAt");

-- AddForeignKey
ALTER TABLE "OsrmCacheEntry" ADD CONSTRAINT "OsrmCacheEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

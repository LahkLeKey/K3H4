-- CreateTable
CREATE TABLE "GeoDemTileCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'maptiler',
    "source" TEXT,
    "signature" TEXT NOT NULL,
    "z" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'png',
    "url" TEXT,
    "data" BYTEA,
    "byteLength" INTEGER,
    "etag" TEXT,
    "cacheControl" TEXT,
    "expiresAt" TIMESTAMP(3),
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccessed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeoDemTileCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeoDemTileCache_signature_key" ON "GeoDemTileCache"("signature");

-- CreateIndex
CREATE INDEX "GeoDemTileCache_provider_z_x_y_idx" ON "GeoDemTileCache"("provider", "z", "x", "y");

-- CreateIndex
CREATE INDEX "GeoDemTileCache_expiresAt_idx" ON "GeoDemTileCache"("expiresAt");

-- AddForeignKey
ALTER TABLE "GeoDemTileCache" ADD CONSTRAINT "GeoDemTileCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

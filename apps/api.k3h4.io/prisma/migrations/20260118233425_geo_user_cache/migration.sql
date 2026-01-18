-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "lastBearing" DOUBLE PRECISION,
ADD COLUMN     "lastCenterLat" DECIMAL(11,6),
ADD COLUMN     "lastCenterLng" DECIMAL(11,6),
ADD COLUMN     "lastPitch" DOUBLE PRECISION,
ADD COLUMN     "lastPoiCount" INTEGER,
ADD COLUMN     "lastPoiFetchedAt" TIMESTAMP(3),
ADD COLUMN     "lastPoiKinds" TEXT,
ADD COLUMN     "lastPoiRadiusM" INTEGER,
ADD COLUMN     "lastPoiSignature" TEXT,
ADD COLUMN     "lastZoom" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "GeoQueryCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "params" JSONB NOT NULL,
    "payload" JSONB NOT NULL,
    "count" INTEGER,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoQueryCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeoQueryCache_signature_key" ON "GeoQueryCache"("signature");

-- CreateIndex
CREATE INDEX "GeoQueryCache_type_idx" ON "GeoQueryCache"("type");

-- CreateIndex
CREATE INDEX "GeoQueryCache_expiresAt_idx" ON "GeoQueryCache"("expiresAt");

-- AddForeignKey
ALTER TABLE "GeoQueryCache" ADD CONSTRAINT "GeoQueryCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

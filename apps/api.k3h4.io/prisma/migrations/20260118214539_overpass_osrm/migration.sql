-- CreateTable
CREATE TABLE "GeoRouteCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'osrm',
    "signature" TEXT NOT NULL,
    "originLat" DECIMAL(11,6) NOT NULL,
    "originLng" DECIMAL(11,6) NOT NULL,
    "destinationLat" DECIMAL(11,6) NOT NULL,
    "destinationLng" DECIMAL(11,6) NOT NULL,
    "distanceKm" DECIMAL(14,4) NOT NULL,
    "durationMinutes" INTEGER,
    "geojson" JSONB,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoRouteCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoPoiCache" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "signature" TEXT NOT NULL,
    "centerLat" DECIMAL(11,6) NOT NULL,
    "centerLng" DECIMAL(11,6) NOT NULL,
    "radiusM" INTEGER NOT NULL,
    "kinds" TEXT NOT NULL,
    "pois" JSONB NOT NULL,
    "count" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoPoiCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeoRouteCache_signature_key" ON "GeoRouteCache"("signature");

-- CreateIndex
CREATE INDEX "GeoRouteCache_expiresAt_idx" ON "GeoRouteCache"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "GeoPoiCache_signature_key" ON "GeoPoiCache"("signature");

-- CreateIndex
CREATE INDEX "GeoPoiCache_expiresAt_idx" ON "GeoPoiCache"("expiresAt");

-- AddForeignKey
ALTER TABLE "GeoRouteCache" ADD CONSTRAINT "GeoRouteCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoPoiCache" ADD CONSTRAINT "GeoPoiCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

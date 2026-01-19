-- CreateTable
CREATE TABLE "Poi" (
    "id" TEXT NOT NULL,
    "osmType" TEXT NOT NULL DEFAULT 'node',
    "osmId" BIGINT NOT NULL,
    "name" TEXT,
    "category" TEXT,
    "latitude" DECIMAL(11,6) NOT NULL,
    "longitude" DECIMAL(11,6) NOT NULL,
    "tags" JSONB,
    "source" TEXT NOT NULL DEFAULT 'osm',
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Poi_latitude_longitude_idx" ON "Poi"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Poi_category_idx" ON "Poi"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Poi_osmType_osmId_key" ON "Poi"("osmType", "osmId");

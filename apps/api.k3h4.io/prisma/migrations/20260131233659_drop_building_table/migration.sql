/*
  Warnings:

  - You are about to drop the `Building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Poi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Poi" DROP CONSTRAINT "Poi_buildingId_fkey";

-- DropTable
DROP TABLE "Building";

-- DropTable
DROP TABLE "Poi";

-- CreateTable
CREATE TABLE "PointOfInterest" (
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

    CONSTRAINT "PointOfInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PointOfInterest_latitude_longitude_idx" ON "PointOfInterest"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "PointOfInterest_category_idx" ON "PointOfInterest"("category");

-- CreateIndex
CREATE UNIQUE INDEX "PointOfInterest_osmType_osmId_key" ON "PointOfInterest"("osmType", "osmId");

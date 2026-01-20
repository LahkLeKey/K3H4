-- Geometry stored as JSON; PostGIS not required

-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL');

-- AlterTable
ALTER TABLE "Poi" ADD COLUMN     "buildingId" INTEGER;

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "osmId" BIGINT,
    "type" "BuildingType" NOT NULL,
    "addressHouseNumber" TEXT,
    "addressStreet" TEXT,
    "addressCity" TEXT,
    "addressPostcode" TEXT,
    "addressState" TEXT,
    "addressCountry" TEXT,
    "geometry" JSONB,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_osmId_key" ON "Building"("osmId");

-- CreateIndex
CREATE INDEX "Poi_buildingId_idx" ON "Poi"("buildingId");

-- AddForeignKey
ALTER TABLE "Poi" ADD CONSTRAINT "Poi_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `PointOfInterest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[type,osmType,osmId]` on the table `Actor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'point-of-interest';

-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "category" TEXT,
ADD COLUMN     "lastSeenAt" TIMESTAMP(3),
ADD COLUMN     "latitude" DECIMAL(11,6),
ADD COLUMN     "longitude" DECIMAL(11,6),
ADD COLUMN     "osmId" BIGINT,
ADD COLUMN     "osmType" TEXT;

-- DropTable
DROP TABLE "PointOfInterest";

-- CreateIndex
CREATE INDEX "Actor_category_idx" ON "Actor"("category");

-- CreateIndex
CREATE INDEX "Actor_latitude_longitude_idx" ON "Actor"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_type_osmType_osmId_key" ON "Actor"("type", "osmType", "osmId");

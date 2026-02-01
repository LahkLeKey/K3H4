/*
  Warnings:

  - You are about to drop the column `routeCacheId` on the `GeoDirection` table. All the data in the column will be lost.
  - You are about to drop the `GeoDemTileCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoPoiCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoQueryCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoRouteCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoStatusLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoViewHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'geo';

-- DropForeignKey
ALTER TABLE "GeoDemTileCache" DROP CONSTRAINT "GeoDemTileCache_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoDirection" DROP CONSTRAINT "GeoDirection_routeCacheId_fkey";

-- DropForeignKey
ALTER TABLE "GeoPoiCache" DROP CONSTRAINT "GeoPoiCache_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoQueryCache" DROP CONSTRAINT "GeoQueryCache_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoRouteCache" DROP CONSTRAINT "GeoRouteCache_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoStatusLog" DROP CONSTRAINT "GeoStatusLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoViewHistory" DROP CONSTRAINT "GeoViewHistory_userId_fkey";

-- AlterTable
ALTER TABLE "GeoDirection" DROP COLUMN "routeCacheId",
ADD COLUMN     "actorId" TEXT;

-- AlterTable
ALTER TABLE "MaptilerCacheEntry" ADD COLUMN     "actorId" TEXT;

-- AlterTable
ALTER TABLE "MaptilerQuery" ADD COLUMN     "actorId" TEXT;

-- AlterTable
ALTER TABLE "OsrmCacheEntry" ADD COLUMN     "actorId" TEXT;

-- DropTable
DROP TABLE "GeoDemTileCache";

-- DropTable
DROP TABLE "GeoPoiCache";

-- DropTable
DROP TABLE "GeoQueryCache";

-- DropTable
DROP TABLE "GeoRouteCache";

-- DropTable
DROP TABLE "GeoStatusLog";

-- DropTable
DROP TABLE "GeoViewHistory";

-- CreateIndex
CREATE INDEX "GeoDirection_actorId_idx" ON "GeoDirection"("actorId");

-- CreateIndex
CREATE INDEX "MaptilerCacheEntry_actorId_kind_idx" ON "MaptilerCacheEntry"("actorId", "kind");

-- CreateIndex
CREATE INDEX "MaptilerQuery_actorId_kind_idx" ON "MaptilerQuery"("actorId", "kind");

-- CreateIndex
CREATE INDEX "OsrmCacheEntry_actorId_service_idx" ON "OsrmCacheEntry"("actorId", "service");

-- AddForeignKey
ALTER TABLE "GeoDirection" ADD CONSTRAINT "GeoDirection_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaptilerQuery" ADD CONSTRAINT "MaptilerQuery_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaptilerCacheEntry" ADD CONSTRAINT "MaptilerCacheEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OsrmCacheEntry" ADD CONSTRAINT "OsrmCacheEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

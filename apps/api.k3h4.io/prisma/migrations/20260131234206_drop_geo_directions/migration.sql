/*
  Warnings:

  - You are about to drop the `GeoDirection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoDirectionSegment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoDirectionStop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GeoDirection" DROP CONSTRAINT "GeoDirection_actorId_fkey";

-- DropForeignKey
ALTER TABLE "GeoDirection" DROP CONSTRAINT "GeoDirection_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoDirectionSegment" DROP CONSTRAINT "GeoDirectionSegment_directionId_fkey";

-- DropForeignKey
ALTER TABLE "GeoDirectionStop" DROP CONSTRAINT "GeoDirectionStop_directionId_fkey";

-- DropTable
DROP TABLE "GeoDirection";

-- DropTable
DROP TABLE "GeoDirectionSegment";

-- DropTable
DROP TABLE "GeoDirectionStop";

/*
  Warnings:

  - You are about to drop the `FreightLoad` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'freight';

-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'wikidata-cache';

-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'enrichment-cache';

-- AlterEnum
ALTER TYPE "EntityKind" ADD VALUE 'freight_load';

-- DropForeignKey
ALTER TABLE "FreightLoad" DROP CONSTRAINT "FreightLoad_userId_fkey";

-- DropTable
DROP TABLE "FreightLoad";

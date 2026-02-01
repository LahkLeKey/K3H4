/*
  Warnings:

  - You are about to drop the `EnrichmentCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WikidataCacheEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActorType" ADD VALUE 'wikidata-cache';
ALTER TYPE "ActorType" ADD VALUE 'enrichment-cache';

-- DropTable
DROP TABLE "EnrichmentCache";

-- DropTable
DROP TABLE "WikidataCacheEntry";

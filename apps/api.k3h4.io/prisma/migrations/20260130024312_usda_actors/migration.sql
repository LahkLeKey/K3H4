/*
  Warnings:

  - You are about to drop the `UsdaCacheEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaCommodity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaCommodityAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaCountry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaRegion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaRelease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaSyncState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsdaUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'usda-feed';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EntityKind" ADD VALUE 'usda-region';
ALTER TYPE "EntityKind" ADD VALUE 'usda-country';
ALTER TYPE "EntityKind" ADD VALUE 'usda-commodity';
ALTER TYPE "EntityKind" ADD VALUE 'usda-unit';
ALTER TYPE "EntityKind" ADD VALUE 'usda-attribute';

-- DropTable
DROP TABLE "UsdaCacheEntry";

-- DropTable
DROP TABLE "UsdaCommodity";

-- DropTable
DROP TABLE "UsdaCommodityAttribute";

-- DropTable
DROP TABLE "UsdaCountry";

-- DropTable
DROP TABLE "UsdaRegion";

-- DropTable
DROP TABLE "UsdaRelease";

-- DropTable
DROP TABLE "UsdaSyncState";

-- DropTable
DROP TABLE "UsdaUnit";

-- CreateTable
CREATE TABLE "ApiCacheEntry" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "params" JSONB,
    "paramsHash" TEXT NOT NULL,
    "payload" JSONB,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiCacheEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApiCacheEntry_provider_scope_endpoint_idx" ON "ApiCacheEntry"("provider", "scope", "endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "ApiCacheEntry_provider_scope_endpoint_paramsHash_key" ON "ApiCacheEntry"("provider", "scope", "endpoint", "paramsHash");

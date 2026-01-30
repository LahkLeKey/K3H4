/*
  Warnings:

  - You are about to drop the `WarehouseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActorType" ADD VALUE 'agriculture-resource-library';
ALTER TYPE "ActorType" ADD VALUE 'warehouse';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EntityKind" ADD VALUE 'agriculture_resource_category';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_resource';
ALTER TYPE "EntityKind" ADD VALUE 'warehouse_item';

-- DropForeignKey
ALTER TABLE "WarehouseItem" DROP CONSTRAINT "WarehouseItem_freightLoadId_fkey";

-- DropForeignKey
ALTER TABLE "WarehouseItem" DROP CONSTRAINT "WarehouseItem_userId_fkey";

-- DropTable
DROP TABLE "WarehouseItem";

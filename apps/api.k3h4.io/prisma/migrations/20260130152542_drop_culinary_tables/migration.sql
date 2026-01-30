/*
  Warnings:

  - You are about to drop the `CulinaryMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CulinaryPrepTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CulinarySupplierNeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActorType" ADD VALUE 'culinary';
ALTER TYPE "ActorType" ADD VALUE 'point-of-sale-store';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EntityKind" ADD VALUE 'culinary-menu-item';
ALTER TYPE "EntityKind" ADD VALUE 'culinary-prep-task';
ALTER TYPE "EntityKind" ADD VALUE 'culinary-supplier-need';
ALTER TYPE "EntityKind" ADD VALUE 'point-of-sale_ticket';

-- DropForeignKey
ALTER TABLE "CulinaryMenuItem" DROP CONSTRAINT "CulinaryMenuItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "CulinaryPrepTask" DROP CONSTRAINT "CulinaryPrepTask_userId_fkey";

-- DropForeignKey
ALTER TABLE "CulinarySupplierNeed" DROP CONSTRAINT "CulinarySupplierNeed_userId_fkey";

-- DropTable
DROP TABLE "CulinaryMenuItem";

-- DropTable
DROP TABLE "CulinaryPrepTask";

-- DropTable
DROP TABLE "CulinarySupplierNeed";

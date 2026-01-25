/*
  Warnings:

  - The `status` column on the `AgricultureCropPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `AgricultureInventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `AgricultureTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ArcadeCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ArcadeMachine` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ArcadeRedemption` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Assignment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `CulinaryPrepTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `CulinarySupplierNeed` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `FreightLoad` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `PersonaCompatibility` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `PosTicket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `StaffingEngagement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `StaffingEngagement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `StaffingPlacement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `StaffingRole` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `StaffingRole` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `StaffingShift` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `coverageStatus` column on the `StaffingShift` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `WarehouseItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LifecycleStatus" AS ENUM ('active', 'inactive', 'open', 'closed', 'pending', 'planning', 'completed', 'stored', 'idle', 'scheduled', 'unfilled');

-- CreateEnum
CREATE TYPE "EngagementPriority" AS ENUM ('low', 'normal', 'medium', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "CoverageStatus" AS ENUM ('unfilled', 'filled', 'partial');

-- AlterTable
ALTER TABLE "AgricultureCropPlan" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "AgricultureInventory" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "AgricultureTask" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "ArcadeCard" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "ArcadeMachine" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'idle';

-- AlterTable
ALTER TABLE "ArcadeRedemption" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "CulinaryPrepTask" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "CulinarySupplierNeed" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "FreightLoad" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'planning';

-- AlterTable
ALTER TABLE "PersonaCompatibility" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "PosTicket" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "StaffingEngagement" DROP COLUMN "priority",
ADD COLUMN     "priority" "EngagementPriority" NOT NULL DEFAULT 'medium',
DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "StaffingPlacement" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "StaffingRole" DROP COLUMN "priority",
ADD COLUMN     "priority" "EngagementPriority" NOT NULL DEFAULT 'normal',
DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "StaffingShift" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'scheduled',
DROP COLUMN "coverageStatus",
ADD COLUMN     "coverageStatus" "CoverageStatus" NOT NULL DEFAULT 'unfilled';

-- AlterTable
ALTER TABLE "WarehouseItem" DROP COLUMN "status",
ADD COLUMN     "status" "LifecycleStatus" NOT NULL DEFAULT 'stored';

-- CreateIndex
CREATE INDEX "AgricultureTask_userId_status_idx" ON "AgricultureTask"("userId", "status");

-- CreateIndex
CREATE INDEX "ArcadeCard_userId_status_idx" ON "ArcadeCard"("userId", "status");

-- CreateIndex
CREATE INDEX "ArcadeMachine_userId_status_idx" ON "ArcadeMachine"("userId", "status");

-- CreateIndex
CREATE INDEX "CulinaryPrepTask_userId_status_idx" ON "CulinaryPrepTask"("userId", "status");

-- CreateIndex
CREATE INDEX "CulinarySupplierNeed_userId_status_idx" ON "CulinarySupplierNeed"("userId", "status");

-- CreateIndex
CREATE INDEX "FreightLoad_userId_status_idx" ON "FreightLoad"("userId", "status");

-- CreateIndex
CREATE INDEX "StaffingEngagement_userId_status_idx" ON "StaffingEngagement"("userId", "status");

-- CreateIndex
CREATE INDEX "StaffingPlacement_userId_status_idx" ON "StaffingPlacement"("userId", "status");

-- CreateIndex
CREATE INDEX "StaffingRole_userId_status_idx" ON "StaffingRole"("userId", "status");

-- CreateIndex
CREATE INDEX "StaffingShift_userId_status_idx" ON "StaffingShift"("userId", "status");

-- CreateIndex
CREATE INDEX "WarehouseItem_userId_status_idx" ON "WarehouseItem"("userId", "status");

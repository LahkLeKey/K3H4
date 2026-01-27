-- CreateEnum
CREATE TYPE "WarehouseCategory" AS ENUM ('agriculture', 'other');

-- AlterTable
ALTER TABLE "WarehouseItem" ADD COLUMN     "category" "WarehouseCategory" NOT NULL DEFAULT 'other',
ADD COLUMN     "metadata" JSONB;

-- CreateIndex
CREATE INDEX "WarehouseItem_userId_category_idx" ON "WarehouseItem"("userId", "category");

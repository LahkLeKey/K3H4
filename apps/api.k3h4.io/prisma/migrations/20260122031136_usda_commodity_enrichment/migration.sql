-- AlterTable
ALTER TABLE "UsdaUnit" ADD COLUMN     "enrichment" JSONB,
ADD COLUMN     "wikidataId" TEXT;

-- CreateTable
CREATE TABLE "UsdaCommodityAttribute" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "wikidataId" TEXT,
    "enrichment" JSONB,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaCommodityAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UsdaCommodityAttribute_dataset_idx" ON "UsdaCommodityAttribute"("dataset");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaCommodityAttribute_dataset_code_key" ON "UsdaCommodityAttribute"("dataset", "code");

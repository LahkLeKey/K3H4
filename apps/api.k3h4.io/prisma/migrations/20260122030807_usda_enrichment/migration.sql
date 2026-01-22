-- AlterTable
ALTER TABLE "UsdaCommodity" ADD COLUMN     "enrichment" JSONB,
ADD COLUMN     "wikidataId" TEXT;

-- AlterTable
ALTER TABLE "UsdaCountry" ADD COLUMN     "enrichment" JSONB,
ADD COLUMN     "wikidataId" TEXT;

-- AlterTable
ALTER TABLE "UsdaRegion" ADD COLUMN     "enrichment" JSONB,
ADD COLUMN     "wikidataId" TEXT;

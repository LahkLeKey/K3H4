-- CreateTable
CREATE TABLE "UsdaRegion" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaCountry" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "regionCode" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaCommodity" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaCommodity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaUnit" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaRelease" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "releasedOn" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaRelease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaCacheEntry" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "params" JSONB,
    "paramsHash" TEXT NOT NULL,
    "payload" JSONB,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaCacheEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaSyncState" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "lastReleaseOn" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsdaSyncState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UsdaRegion_dataset_idx" ON "UsdaRegion"("dataset");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaRegion_dataset_code_key" ON "UsdaRegion"("dataset", "code");

-- CreateIndex
CREATE INDEX "UsdaCountry_dataset_regionCode_idx" ON "UsdaCountry"("dataset", "regionCode");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaCountry_dataset_code_key" ON "UsdaCountry"("dataset", "code");

-- CreateIndex
CREATE INDEX "UsdaCommodity_dataset_idx" ON "UsdaCommodity"("dataset");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaCommodity_dataset_code_key" ON "UsdaCommodity"("dataset", "code");

-- CreateIndex
CREATE INDEX "UsdaUnit_dataset_idx" ON "UsdaUnit"("dataset");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaUnit_dataset_code_key" ON "UsdaUnit"("dataset", "code");

-- CreateIndex
CREATE INDEX "UsdaRelease_dataset_releasedOn_idx" ON "UsdaRelease"("dataset", "releasedOn");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaRelease_dataset_scope_key" ON "UsdaRelease"("dataset", "scope");

-- CreateIndex
CREATE INDEX "UsdaCacheEntry_dataset_endpoint_idx" ON "UsdaCacheEntry"("dataset", "endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaCacheEntry_dataset_endpoint_paramsHash_key" ON "UsdaCacheEntry"("dataset", "endpoint", "paramsHash");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaSyncState_dataset_scope_key" ON "UsdaSyncState"("dataset", "scope");

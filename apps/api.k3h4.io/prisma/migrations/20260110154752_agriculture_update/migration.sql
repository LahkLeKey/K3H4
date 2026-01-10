-- AlterTable
ALTER TABLE "AgriculturePlot" ADD COLUMN     "fieldCode" TEXT,
ADD COLUMN     "irrigationZone" TEXT,
ADD COLUMN     "lastConditionAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "soilType" TEXT;

-- AlterTable
ALTER TABLE "AgricultureTask" ADD COLUMN     "cropPlanId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "plotId" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "tags" JSONB;

-- CreateTable
CREATE TABLE "AgricultureCropPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plotId" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "phase" TEXT NOT NULL DEFAULT 'planned',
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" TIMESTAMP(3) NOT NULL,
    "targetHarvestDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureCropPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgriculturePlotCondition" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plotId" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION,
    "moisture" DOUBLE PRECISION,
    "ph" DECIMAL(5,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgriculturePlotCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgricultureInventory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT,
    "totalQuantity" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgricultureInventoryMovement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "shipmentId" TEXT,
    "type" TEXT NOT NULL,
    "quantity" DECIMAL(18,2) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureInventoryMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AgricultureCropPlan_userId_plotId_idx" ON "AgricultureCropPlan"("userId", "plotId");

-- CreateIndex
CREATE INDEX "AgricultureCropPlan_userId_phase_idx" ON "AgricultureCropPlan"("userId", "phase");

-- CreateIndex
CREATE INDEX "AgriculturePlotCondition_userId_plotId_idx" ON "AgriculturePlotCondition"("userId", "plotId");

-- CreateIndex
CREATE INDEX "AgriculturePlotCondition_userId_recordedAt_idx" ON "AgriculturePlotCondition"("userId", "recordedAt");

-- CreateIndex
CREATE INDEX "AgricultureInventory_userId_sku_idx" ON "AgricultureInventory"("userId", "sku");

-- CreateIndex
CREATE INDEX "AgricultureInventoryMovement_userId_idx" ON "AgricultureInventoryMovement"("userId");

-- CreateIndex
CREATE INDEX "AgricultureInventoryMovement_inventoryId_idx" ON "AgricultureInventoryMovement"("inventoryId");

-- CreateIndex
CREATE INDEX "AgricultureInventoryMovement_userId_shipmentId_idx" ON "AgricultureInventoryMovement"("userId", "shipmentId");

-- CreateIndex
CREATE INDEX "AgriculturePlot_userId_fieldCode_idx" ON "AgriculturePlot"("userId", "fieldCode");

-- CreateIndex
CREATE INDEX "AgricultureTask_userId_plotId_idx" ON "AgricultureTask"("userId", "plotId");

-- CreateIndex
CREATE INDEX "AgricultureTask_userId_cropPlanId_idx" ON "AgricultureTask"("userId", "cropPlanId");

-- AddForeignKey
ALTER TABLE "AgricultureCropPlan" ADD CONSTRAINT "AgricultureCropPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureCropPlan" ADD CONSTRAINT "AgricultureCropPlan_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "AgriculturePlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgriculturePlotCondition" ADD CONSTRAINT "AgriculturePlotCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgriculturePlotCondition" ADD CONSTRAINT "AgriculturePlotCondition_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "AgriculturePlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureInventory" ADD CONSTRAINT "AgricultureInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureInventoryMovement" ADD CONSTRAINT "AgricultureInventoryMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureInventoryMovement" ADD CONSTRAINT "AgricultureInventoryMovement_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "AgricultureInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureInventoryMovement" ADD CONSTRAINT "AgricultureInventoryMovement_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "AgricultureShipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureTask" ADD CONSTRAINT "AgricultureTask_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "AgriculturePlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureTask" ADD CONSTRAINT "AgricultureTask_cropPlanId_fkey" FOREIGN KEY ("cropPlanId") REFERENCES "AgricultureCropPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

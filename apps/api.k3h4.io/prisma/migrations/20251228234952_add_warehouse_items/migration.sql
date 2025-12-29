-- CreateTable
CREATE TABLE "WarehouseItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'stored',
    "freightLoadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehouseItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WarehouseItem_userId_status_idx" ON "WarehouseItem"("userId", "status");

-- CreateIndex
CREATE INDEX "WarehouseItem_userId_freightLoadId_idx" ON "WarehouseItem"("userId", "freightLoadId");

-- AddForeignKey
ALTER TABLE "WarehouseItem" ADD CONSTRAINT "WarehouseItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseItem" ADD CONSTRAINT "WarehouseItem_freightLoadId_fkey" FOREIGN KEY ("freightLoadId") REFERENCES "FreightLoad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

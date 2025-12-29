-- CreateTable
CREATE TABLE "PosStore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PosStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PosTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "total" DECIMAL(18,2) NOT NULL,
    "itemsCount" INTEGER NOT NULL DEFAULT 0,
    "channel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PosTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PosLineItem" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PosLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgriculturePlot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "acres" DECIMAL(10,2) NOT NULL,
    "health" TEXT NOT NULL DEFAULT 'Unknown',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgriculturePlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgricultureTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assignee" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgricultureShipment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lot" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "eta" TIMESTAMP(3),
    "freightLoadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureShipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CulinaryMenuItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prepMinutes" INTEGER NOT NULL,
    "cost" DECIMAL(18,2) NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulinaryMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CulinaryPrepTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulinaryPrepTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CulinarySupplierNeed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulinarySupplierNeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PosStore_userId_idx" ON "PosStore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PosStore_userId_name_key" ON "PosStore"("userId", "name");

-- CreateIndex
CREATE INDEX "PosTicket_userId_storeId_idx" ON "PosTicket"("userId", "storeId");

-- CreateIndex
CREATE INDEX "PosTicket_userId_channel_idx" ON "PosTicket"("userId", "channel");

-- CreateIndex
CREATE INDEX "PosTicket_userId_createdAt_idx" ON "PosTicket"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PosLineItem_ticketId_idx" ON "PosLineItem"("ticketId");

-- CreateIndex
CREATE INDEX "AgriculturePlot_userId_crop_idx" ON "AgriculturePlot"("userId", "crop");

-- CreateIndex
CREATE INDEX "AgricultureTask_userId_status_idx" ON "AgricultureTask"("userId", "status");

-- CreateIndex
CREATE INDEX "AgricultureTask_userId_dueDate_idx" ON "AgricultureTask"("userId", "dueDate");

-- CreateIndex
CREATE INDEX "AgricultureShipment_userId_idx" ON "AgricultureShipment"("userId");

-- CreateIndex
CREATE INDEX "AgricultureShipment_userId_freightLoadId_idx" ON "AgricultureShipment"("userId", "freightLoadId");

-- CreateIndex
CREATE INDEX "CulinaryMenuItem_userId_name_idx" ON "CulinaryMenuItem"("userId", "name");

-- CreateIndex
CREATE INDEX "CulinaryPrepTask_userId_status_idx" ON "CulinaryPrepTask"("userId", "status");

-- CreateIndex
CREATE INDEX "CulinarySupplierNeed_userId_status_idx" ON "CulinarySupplierNeed"("userId", "status");

-- AddForeignKey
ALTER TABLE "PosStore" ADD CONSTRAINT "PosStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosTicket" ADD CONSTRAINT "PosTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosTicket" ADD CONSTRAINT "PosTicket_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "PosStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosLineItem" ADD CONSTRAINT "PosLineItem_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "PosTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgriculturePlot" ADD CONSTRAINT "AgriculturePlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureTask" ADD CONSTRAINT "AgricultureTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureShipment" ADD CONSTRAINT "AgricultureShipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureShipment" ADD CONSTRAINT "AgricultureShipment_freightLoadId_fkey" FOREIGN KEY ("freightLoadId") REFERENCES "FreightLoad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulinaryMenuItem" ADD CONSTRAINT "CulinaryMenuItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulinaryPrepTask" ADD CONSTRAINT "CulinaryPrepTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulinarySupplierNeed" ADD CONSTRAINT "CulinarySupplierNeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

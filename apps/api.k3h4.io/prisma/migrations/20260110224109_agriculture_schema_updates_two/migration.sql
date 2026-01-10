-- CreateTable
CREATE TABLE "AgricultureSlot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slotIndex" INTEGER NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costPaid" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "plotId" TEXT,

    CONSTRAINT "AgricultureSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AgricultureSlot_userId_idx" ON "AgricultureSlot"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AgricultureSlot_userId_slotIndex_key" ON "AgricultureSlot"("userId", "slotIndex");

-- AddForeignKey
ALTER TABLE "AgricultureSlot" ADD CONSTRAINT "AgricultureSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgricultureSlot" ADD CONSTRAINT "AgricultureSlot_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "AgriculturePlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

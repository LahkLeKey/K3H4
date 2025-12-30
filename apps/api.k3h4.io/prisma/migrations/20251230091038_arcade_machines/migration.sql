-- CreateTable
CREATE TABLE "ArcadeMachine" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gameTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'idle',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArcadeMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcadeCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT,
    "balance" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArcadeCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcadeTopUp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'k3h4-coin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArcadeTopUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcadePrize" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "costCoins" DECIMAL(18,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArcadePrize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcadeSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "creditsSpent" DECIMAL(18,2) NOT NULL,
    "score" INTEGER,
    "rewardRedemptionId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "ArcadeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcadeRedemption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardId" TEXT,
    "prizeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "fulfilledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArcadeRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArcadeMachine_userId_status_idx" ON "ArcadeMachine"("userId", "status");

-- CreateIndex
CREATE INDEX "ArcadeCard_userId_status_idx" ON "ArcadeCard"("userId", "status");

-- CreateIndex
CREATE INDEX "ArcadeTopUp_userId_cardId_idx" ON "ArcadeTopUp"("userId", "cardId");

-- CreateIndex
CREATE INDEX "ArcadePrize_userId_name_idx" ON "ArcadePrize"("userId", "name");

-- CreateIndex
CREATE INDEX "ArcadeSession_userId_machineId_idx" ON "ArcadeSession"("userId", "machineId");

-- CreateIndex
CREATE INDEX "ArcadeSession_userId_cardId_idx" ON "ArcadeSession"("userId", "cardId");

-- CreateIndex
CREATE INDEX "ArcadeRedemption_userId_prizeId_idx" ON "ArcadeRedemption"("userId", "prizeId");

-- AddForeignKey
ALTER TABLE "ArcadeMachine" ADD CONSTRAINT "ArcadeMachine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeCard" ADD CONSTRAINT "ArcadeCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeTopUp" ADD CONSTRAINT "ArcadeTopUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeTopUp" ADD CONSTRAINT "ArcadeTopUp_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ArcadeCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadePrize" ADD CONSTRAINT "ArcadePrize_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeSession" ADD CONSTRAINT "ArcadeSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeSession" ADD CONSTRAINT "ArcadeSession_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "ArcadeMachine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeSession" ADD CONSTRAINT "ArcadeSession_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ArcadeCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeSession" ADD CONSTRAINT "ArcadeSession_rewardRedemptionId_fkey" FOREIGN KEY ("rewardRedemptionId") REFERENCES "ArcadeRedemption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeRedemption" ADD CONSTRAINT "ArcadeRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeRedemption" ADD CONSTRAINT "ArcadeRedemption_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ArcadeCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcadeRedemption" ADD CONSTRAINT "ArcadeRedemption_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "ArcadePrize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "BankTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "kind" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "note" TEXT,
    "balanceAfter" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BankTransaction_userId_createdAt_idx" ON "BankTransaction"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "BankTransaction" ADD CONSTRAINT "BankTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

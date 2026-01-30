/*
  Warnings:

  - Changed the type of `type` on the `Actor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kind` on the `Entity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BankActorType" AS ENUM ('bank-account');

-- CreateEnum
CREATE TYPE "BankTransactionDirection" AS ENUM ('credit', 'debit');

-- CreateEnum
CREATE TYPE "BankTransactionKind" AS ENUM ('deposit', 'withdrawal', 'set', 'assignment_payout', 'freight_payment', 'arcade_topup');

-- AlterTable
ALTER TABLE "Actor"
  ALTER COLUMN "type" TYPE "BankActorType" USING "type"::"BankActorType",
  ALTER COLUMN "type" SET DEFAULT 'bank-account';

-- AlterTable
ALTER TABLE "Entity"
  ADD COLUMN     "direction" "BankTransactionDirection" NOT NULL DEFAULT 'debit';

-- Update existing direction values from metadata so legacy rows keep their semantics
UPDATE "Entity"
SET "direction" = CASE
  WHEN metadata->>'direction' IN ('credit', 'debit')
  THEN (metadata->>'direction')::"BankTransactionDirection"
  ELSE 'debit'
END;

-- Remove the default now that rows are initialized
ALTER TABLE "Entity" ALTER COLUMN "direction" DROP DEFAULT;

-- Change kind to the new enum while sourcing the value from metadata
ALTER TABLE "Entity"
  ALTER COLUMN "kind" TYPE "BankTransactionKind"
  USING CASE
    WHEN metadata->>'kind' IN ('deposit', 'withdrawal', 'set',
        'assignment_payout', 'freight_payment', 'arcade_topup')
    THEN (metadata->>'kind')::"BankTransactionKind"
    ELSE 'deposit'
  END;

-- CreateIndex
CREATE INDEX "Entity_direction_idx" ON "Entity"("direction");

/*
  Warnings:

  - You are about to drop the `ArcadeCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArcadeMachine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArcadePrize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArcadeRedemption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArcadeSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArcadeTopUp` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BankActorType" ADD VALUE 'arcade-machine';
ALTER TYPE "BankActorType" ADD VALUE 'arcade-player-card';
ALTER TYPE "BankActorType" ADD VALUE 'arcade-prize';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BankTransactionKind" ADD VALUE 'arcade_session';
ALTER TYPE "BankTransactionKind" ADD VALUE 'arcade_prize_redemption';

-- DropForeignKey
ALTER TABLE "ArcadeCard" DROP CONSTRAINT "ArcadeCard_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeMachine" DROP CONSTRAINT "ArcadeMachine_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadePrize" DROP CONSTRAINT "ArcadePrize_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeRedemption" DROP CONSTRAINT "ArcadeRedemption_cardId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeRedemption" DROP CONSTRAINT "ArcadeRedemption_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeRedemption" DROP CONSTRAINT "ArcadeRedemption_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeSession" DROP CONSTRAINT "ArcadeSession_cardId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeSession" DROP CONSTRAINT "ArcadeSession_machineId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeSession" DROP CONSTRAINT "ArcadeSession_rewardRedemptionId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeSession" DROP CONSTRAINT "ArcadeSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeTopUp" DROP CONSTRAINT "ArcadeTopUp_cardId_fkey";

-- DropForeignKey
ALTER TABLE "ArcadeTopUp" DROP CONSTRAINT "ArcadeTopUp_userId_fkey";

-- DropTable
DROP TABLE "ArcadeCard";

-- DropTable
DROP TABLE "ArcadeMachine";

-- DropTable
DROP TABLE "ArcadePrize";

-- DropTable
DROP TABLE "ArcadeRedemption";

-- DropTable
DROP TABLE "ArcadeSession";

-- DropTable
DROP TABLE "ArcadeTopUp";

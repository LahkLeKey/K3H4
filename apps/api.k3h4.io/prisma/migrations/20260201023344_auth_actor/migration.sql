/*
  Warnings:

  - You are about to drop the `ProviderGrant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActorType" ADD VALUE 'auth';
ALTER TYPE "ActorType" ADD VALUE 'auth_refresh_token';
ALTER TYPE "ActorType" ADD VALUE 'auth_provider_grant';

-- DropForeignKey
ALTER TABLE "ProviderGrant" DROP CONSTRAINT "ProviderGrant_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropTable
DROP TABLE "ProviderGrant";

-- DropTable
DROP TABLE "RefreshToken";

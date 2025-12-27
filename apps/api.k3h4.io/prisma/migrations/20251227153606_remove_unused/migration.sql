/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notifications` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash";

-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "notifications",
ADD COLUMN     "note" TEXT;

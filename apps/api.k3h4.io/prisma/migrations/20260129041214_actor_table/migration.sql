/*
  Warnings:

  - You are about to drop the `BankTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankTransaction" DROP CONSTRAINT "BankTransaction_userId_fkey";

-- DropTable
DROP TABLE "BankTransaction";

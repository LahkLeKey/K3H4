/*
  Warnings:

  - You are about to drop the `PosLineItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PosStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PosTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PosLineItem" DROP CONSTRAINT "PosLineItem_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "PosStore" DROP CONSTRAINT "PosStore_userId_fkey";

-- DropForeignKey
ALTER TABLE "PosTicket" DROP CONSTRAINT "PosTicket_storeId_fkey";

-- DropForeignKey
ALTER TABLE "PosTicket" DROP CONSTRAINT "PosTicket_userId_fkey";

-- DropTable
DROP TABLE "PosLineItem";

-- DropTable
DROP TABLE "PosStore";

-- DropTable
DROP TABLE "PosTicket";

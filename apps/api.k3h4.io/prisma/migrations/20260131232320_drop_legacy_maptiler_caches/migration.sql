/*
  Warnings:

  - You are about to drop the `MaptilerCacheEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaptilerQuery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OsrmCacheEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaptilerCacheEntry" DROP CONSTRAINT "MaptilerCacheEntry_actorId_fkey";

-- DropForeignKey
ALTER TABLE "MaptilerCacheEntry" DROP CONSTRAINT "MaptilerCacheEntry_queryId_fkey";

-- DropForeignKey
ALTER TABLE "MaptilerCacheEntry" DROP CONSTRAINT "MaptilerCacheEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "MaptilerQuery" DROP CONSTRAINT "MaptilerQuery_actorId_fkey";

-- DropForeignKey
ALTER TABLE "MaptilerQuery" DROP CONSTRAINT "MaptilerQuery_userId_fkey";

-- DropForeignKey
ALTER TABLE "OsrmCacheEntry" DROP CONSTRAINT "OsrmCacheEntry_actorId_fkey";

-- DropForeignKey
ALTER TABLE "OsrmCacheEntry" DROP CONSTRAINT "OsrmCacheEntry_userId_fkey";

-- DropTable
DROP TABLE "MaptilerCacheEntry";

-- DropTable
DROP TABLE "MaptilerQuery";

-- DropTable
DROP TABLE "OsrmCacheEntry";

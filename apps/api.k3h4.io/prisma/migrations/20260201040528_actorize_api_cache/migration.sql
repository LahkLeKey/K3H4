/*
  Warnings:

  - You are about to drop the `ApiCacheEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'api-cache';

-- DropTable
DROP TABLE "ApiCacheEntry";

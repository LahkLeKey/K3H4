/*
  Warnings:

  - You are about to drop the `TelemetryEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'telemetry';

-- AlterEnum
ALTER TYPE "EntityKind" ADD VALUE 'telemetry-event';

-- DropForeignKey
ALTER TABLE "TelemetryEvent" DROP CONSTRAINT "TelemetryEvent_userId_fkey";

-- DropTable
DROP TABLE "TelemetryEvent";

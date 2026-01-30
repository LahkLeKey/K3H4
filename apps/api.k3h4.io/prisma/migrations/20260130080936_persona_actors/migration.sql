/*
  Warnings:

  - You are about to drop the `StaffingCandidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffingEngagement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffingPlacement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffingRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffingShift` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActorType" ADD VALUE 'persona';
ALTER TYPE "ActorType" ADD VALUE 'staffing';
ALTER TYPE "ActorType" ADD VALUE 'assignment';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EntityKind" ADD VALUE 'persona';
ALTER TYPE "EntityKind" ADD VALUE 'persona_attribute';
ALTER TYPE "EntityKind" ADD VALUE 'persona_compatibility';
ALTER TYPE "EntityKind" ADD VALUE 'staffing_engagement';
ALTER TYPE "EntityKind" ADD VALUE 'staffing_role';
ALTER TYPE "EntityKind" ADD VALUE 'staffing_candidate';
ALTER TYPE "EntityKind" ADD VALUE 'staffing_shift';
ALTER TYPE "EntityKind" ADD VALUE 'staffing_placement';
ALTER TYPE "EntityKind" ADD VALUE 'assignment';
ALTER TYPE "EntityKind" ADD VALUE 'assignment_timecard';

-- DropForeignKey
ALTER TABLE "StaffingCandidate" DROP CONSTRAINT "StaffingCandidate_engagementId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingCandidate" DROP CONSTRAINT "StaffingCandidate_personaId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingCandidate" DROP CONSTRAINT "StaffingCandidate_roleId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingCandidate" DROP CONSTRAINT "StaffingCandidate_userId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingEngagement" DROP CONSTRAINT "StaffingEngagement_userId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingPlacement" DROP CONSTRAINT "StaffingPlacement_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingPlacement" DROP CONSTRAINT "StaffingPlacement_engagementId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingPlacement" DROP CONSTRAINT "StaffingPlacement_personaId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingPlacement" DROP CONSTRAINT "StaffingPlacement_roleId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingPlacement" DROP CONSTRAINT "StaffingPlacement_userId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingRole" DROP CONSTRAINT "StaffingRole_engagementId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingRole" DROP CONSTRAINT "StaffingRole_userId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingShift" DROP CONSTRAINT "StaffingShift_assignedCandidateId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingShift" DROP CONSTRAINT "StaffingShift_assignedPersonaId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingShift" DROP CONSTRAINT "StaffingShift_roleId_fkey";

-- DropForeignKey
ALTER TABLE "StaffingShift" DROP CONSTRAINT "StaffingShift_userId_fkey";

-- DropTable
DROP TABLE "StaffingCandidate";

-- DropTable
DROP TABLE "StaffingEngagement";

-- DropTable
DROP TABLE "StaffingPlacement";

-- DropTable
DROP TABLE "StaffingRole";

-- DropTable
DROP TABLE "StaffingShift";

/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssignmentPayout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssignmentTimecard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Persona` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonaAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonaCompatibility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_personaId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_userId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentPayout" DROP CONSTRAINT "AssignmentPayout_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentPayout" DROP CONSTRAINT "AssignmentPayout_personaId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentTimecard" DROP CONSTRAINT "AssignmentTimecard_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_userId_fkey";

-- DropForeignKey
ALTER TABLE "PersonaAttribute" DROP CONSTRAINT "PersonaAttribute_personaId_fkey";

-- DropForeignKey
ALTER TABLE "PersonaAttribute" DROP CONSTRAINT "PersonaAttribute_userId_fkey";

-- DropForeignKey
ALTER TABLE "PersonaCompatibility" DROP CONSTRAINT "PersonaCompatibility_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "PersonaCompatibility" DROP CONSTRAINT "PersonaCompatibility_targetId_fkey";

-- DropForeignKey
ALTER TABLE "PersonaCompatibility" DROP CONSTRAINT "PersonaCompatibility_userId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "AssignmentPayout";

-- DropTable
DROP TABLE "AssignmentTimecard";

-- DropTable
DROP TABLE "Persona";

-- DropTable
DROP TABLE "PersonaAttribute";

-- DropTable
DROP TABLE "PersonaCompatibility";

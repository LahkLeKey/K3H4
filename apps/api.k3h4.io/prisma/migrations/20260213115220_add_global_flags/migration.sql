-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false;

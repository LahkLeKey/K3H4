-- AlterEnum
ALTER TYPE "ActorType" ADD VALUE 'agriculture-farm';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EntityKind" ADD VALUE 'agriculture_plot';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_plot_condition';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_slot';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_crop_plan';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_task';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_inventory_item';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_inventory_movement';
ALTER TYPE "EntityKind" ADD VALUE 'agriculture_shipment';

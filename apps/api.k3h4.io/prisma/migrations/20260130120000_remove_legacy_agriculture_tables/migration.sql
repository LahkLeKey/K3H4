-- Drop the legacy agriculture tables now replaced by the actor/entity ledger.
DROP TABLE IF EXISTS "AgricultureInventoryMovement" CASCADE;
DROP TABLE IF EXISTS "AgricultureTask" CASCADE;
DROP TABLE IF EXISTS "AgricultureSlot" CASCADE;
DROP TABLE IF EXISTS "AgricultureCropPlan" CASCADE;
DROP TABLE IF EXISTS "AgriculturePlotCondition" CASCADE;
DROP TABLE IF EXISTS "AgriculturePlot" CASCADE;
DROP TABLE IF EXISTS "AgricultureShipment" CASCADE;
DROP TABLE IF EXISTS "AgricultureInventory" CASCADE;

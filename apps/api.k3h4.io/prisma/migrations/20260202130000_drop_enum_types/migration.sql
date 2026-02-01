-- Drop legacy enum types after all enum references are removed
DROP TYPE IF EXISTS "ActorType";
DROP TYPE IF EXISTS "EntityKind";
DROP TYPE IF EXISTS "EntityDirection";
DROP TYPE IF EXISTS "LifecycleStatus";
DROP TYPE IF EXISTS "EngagementPriority";
DROP TYPE IF EXISTS "CoverageStatus";
DROP TYPE IF EXISTS "WarehouseCategory";
DROP TYPE IF EXISTS "ChatRole";
DROP TYPE IF EXISTS "BuildingType";

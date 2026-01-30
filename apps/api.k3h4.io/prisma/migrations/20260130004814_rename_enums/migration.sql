/*
  Rename the bank enums in-place so existing data survives without recreating columns.
*/
-- RenameEnum
ALTER TYPE "BankActorType" RENAME TO "ActorType";

-- RenameEnum
ALTER TYPE "BankTransactionDirection" RENAME TO "EntityDirection";

-- RenameEnum
ALTER TYPE "BankTransactionKind" RENAME TO "EntityKind";

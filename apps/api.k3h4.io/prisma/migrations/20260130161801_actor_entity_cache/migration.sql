-- CreateTable
CREATE TABLE "ActorCache" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "payload" JSONB,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActorCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityCache" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "payload" JSONB,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntityCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActorCache_expiresAt_idx" ON "ActorCache"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "ActorCache_actorId_key_key" ON "ActorCache"("actorId", "key");

-- CreateIndex
CREATE INDEX "EntityCache_expiresAt_idx" ON "EntityCache"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "EntityCache_entityId_key_key" ON "EntityCache"("entityId", "key");

-- AddForeignKey
ALTER TABLE "ActorCache" ADD CONSTRAINT "ActorCache_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityCache" ADD CONSTRAINT "EntityCache_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

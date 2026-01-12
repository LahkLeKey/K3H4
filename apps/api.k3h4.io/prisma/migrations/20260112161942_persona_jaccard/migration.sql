-- CreateTable
CREATE TABLE "PersonaAttribute" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonaAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonaCompatibility" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "jaccardScore" DOUBLE PRECISION NOT NULL,
    "intersectionCount" INTEGER NOT NULL,
    "unionCount" INTEGER NOT NULL,
    "overlappingTokens" JSONB,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rationale" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "PersonaCompatibility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PersonaAttribute_userId_category_idx" ON "PersonaAttribute"("userId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaAttribute_personaId_category_value_key" ON "PersonaAttribute"("personaId", "category", "value");

-- CreateIndex
CREATE INDEX "PersonaCompatibility_userId_computedAt_idx" ON "PersonaCompatibility"("userId", "computedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaCompatibility_userId_sourceId_targetId_key" ON "PersonaCompatibility"("userId", "sourceId", "targetId");

-- AddForeignKey
ALTER TABLE "PersonaAttribute" ADD CONSTRAINT "PersonaAttribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaAttribute" ADD CONSTRAINT "PersonaAttribute_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaCompatibility" ADD CONSTRAINT "PersonaCompatibility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaCompatibility" ADD CONSTRAINT "PersonaCompatibility_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaCompatibility" ADD CONSTRAINT "PersonaCompatibility_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

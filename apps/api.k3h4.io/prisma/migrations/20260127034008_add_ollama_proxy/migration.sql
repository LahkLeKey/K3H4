-- CreateTable
CREATE TABLE "OllamaOperation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sessionId" TEXT,
    "model" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION,
    "systemPrompt" TEXT,
    "requestBody" JSONB NOT NULL,
    "responseBody" JSONB,
    "statusCode" INTEGER,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OllamaOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OllamaOperation_userId_idx" ON "OllamaOperation"("userId");

-- CreateIndex
CREATE INDEX "OllamaOperation_sessionId_idx" ON "OllamaOperation"("sessionId");

-- CreateIndex
CREATE INDEX "OllamaOperation_source_idx" ON "OllamaOperation"("source");

-- CreateIndex
CREATE INDEX "OllamaOperation_createdAt_idx" ON "OllamaOperation"("createdAt");

-- AddForeignKey
ALTER TABLE "OllamaOperation" ADD CONSTRAINT "OllamaOperation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OllamaOperation" ADD CONSTRAINT "OllamaOperation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

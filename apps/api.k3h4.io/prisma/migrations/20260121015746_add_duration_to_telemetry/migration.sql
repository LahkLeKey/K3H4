-- AlterTable
ALTER TABLE "TelemetryEvent" ADD COLUMN     "durationMs" INTEGER;

-- CreateIndex
CREATE INDEX "TelemetryEvent_createdAt_id_idx" ON "TelemetryEvent"("createdAt", "id");

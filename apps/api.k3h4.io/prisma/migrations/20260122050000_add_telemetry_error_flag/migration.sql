-- Add error flag to telemetry events for duration/error timing
ALTER TABLE "TelemetryEvent" ADD COLUMN "error" BOOLEAN NOT NULL DEFAULT false;

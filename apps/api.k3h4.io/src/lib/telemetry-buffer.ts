import type { Prisma, PrismaClient } from "@prisma/client";

const TELEMETRY_BATCH_SIZE = 64;
const TELEMETRY_FLUSH_INTERVAL_MS = 250;

type TelemetryRow = Prisma.TelemetryEventCreateManyInput;

export function createTelemetryBuffer(prisma: PrismaClient) {
  const queue: TelemetryRow[] = [];
  let flushHandle: ReturnType<typeof setTimeout> | null = null;
  let flushing = false;

  const flushQueue = async () => {
    if (flushing) return;
    if (flushHandle) {
      clearTimeout(flushHandle);
      flushHandle = null;
    }
    if (!queue.length) return;

    flushing = true;
    try {
      while (queue.length) {
        const batch = queue.splice(0, TELEMETRY_BATCH_SIZE);
        try {
          await prisma.telemetryEvent.createMany({ data: batch });
        } catch (err) {
          console.warn({ err, batch: batch.length }, "batched telemetry write failed");
        }
      }
    } finally {
      flushing = false;
    }
  };

  const scheduleFlush = () => {
    if (flushHandle || flushing) return;
    flushHandle = setTimeout(() => {
      flushHandle = null;
      void flushQueue();
    }, TELEMETRY_FLUSH_INTERVAL_MS);
  };

  return {
    enqueue(event: TelemetryRow) {
      queue.push(event);
      if (queue.length >= TELEMETRY_BATCH_SIZE) {
        void flushQueue();
      } else {
        scheduleFlush();
      }
    },
  };
}

import {EntityKind, Prisma, PrismaClient} from '@prisma/client';

import {type TelemetryParams} from '../routes/types';
import {ensureTelemetryActorId, TELEMETRY_SESSION_TARGET} from '../services/telemetry-actor';

const TELEMETRY_BATCH_SIZE = 64;
const TELEMETRY_FLUSH_INTERVAL_MS = 250;

type TelemetryRow = TelemetryParams;

const buildMetadata = (row: TelemetryRow): Prisma.InputJsonValue => ({
  path: row.path,
  payload: row.payload === undefined ? Prisma.JsonNull :
                                       (row.payload as Prisma.JsonValue),
  durationMs: row.durationMs,
  error: row.error,
  userId: row.userId,
});

export function createTelemetryBuffer(prisma: PrismaClient) {
  const queue: TelemetryRow[] = [];
  let flushHandle: ReturnType<typeof setTimeout>|null = null;
  let flushing = false;

  const buildEntityInput = async (row: TelemetryRow) => {
    const actorId = await ensureTelemetryActorId(prisma, row.userId);
    return {
      actorId,
      kind: EntityKind.TELEMETRY_EVENT,
      name: row.eventType,
      source: row.source,
      targetType: TELEMETRY_SESSION_TARGET,
      targetId: row.sessionId,
      metadata: buildMetadata(row),
    } as Prisma.EntityCreateManyInput;
  };

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
        const errorRows = batch.filter((row) => row.error);
        const successRows = batch.filter((row) => !row.error);

        if (successRows.length) {
          const payload = await Promise.all(
              successRows.map(async (row) => buildEntityInput(row)));
          try {
            await prisma.entity.createMany({data: payload});
          } catch (err) {
            console.warn(
                {err, batch: payload.length}, 'batched telemetry write failed');
          }
        }

        if (errorRows.length) {
          await Promise.all(errorRows.map(async (row) => {
            try {
              const input = await buildEntityInput(row);
              await prisma.entity.create({data: input});
            } catch (err) {
              console.warn(
                  {err, eventType: row.eventType},
                  'single telemetry write failed');
            }
          }));
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
import type {Prisma, PrismaClient} from '@prisma/client';

const TELEMETRY_BATCH_SIZE = 64;
const TELEMETRY_FLUSH_INTERVAL_MS = 250;

type TelemetryRow = Prisma.TelemetryEventCreateManyInput&{error?: boolean};

export function createTelemetryBuffer(prisma: PrismaClient) {
  const queue: TelemetryRow[] = [];
  let flushHandle: ReturnType<typeof setTimeout>|null = null;
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
        const errorRows = batch.filter((row) => row.error);
        const successRows = batch.filter((row) => !row.error);

        if (successRows.length) {
          const payload = successRows.map(
              ({error: _error, ...rest}) =>
                  rest as Prisma.TelemetryEventCreateManyInput);
          try {
            await prisma.telemetryEvent.createMany({data: payload});
          } catch (err) {
            console.warn(
                {err, batch: payload.length}, 'batched telemetry write failed');
          }
        }

        if (errorRows.length) {
          await Promise.all(
              errorRows.map(async (row) => {
                try {
                  await prisma.telemetryEvent.create({data: row});
                } catch (err) {
                  console.warn(
                      {err, eventType: row.eventType},
                      'single telemetry write failed');
                }
              }),
          );
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

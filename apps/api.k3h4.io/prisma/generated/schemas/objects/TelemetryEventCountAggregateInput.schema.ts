import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  sessionId: z.literal(true).optional(),
  eventType: z.literal(true).optional(),
  source: z.literal(true).optional(),
  path: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const TelemetryEventCountAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCountAggregateInputType>;
export const TelemetryEventCountAggregateInputObjectZodSchema = makeSchema();

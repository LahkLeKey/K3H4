import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  sessionId: z.literal(true).optional(),
  eventType: z.literal(true).optional(),
  source: z.literal(true).optional(),
  path: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const TelemetryEventMinAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventMinAggregateInputType>;
export const TelemetryEventMinAggregateInputObjectZodSchema = makeSchema();

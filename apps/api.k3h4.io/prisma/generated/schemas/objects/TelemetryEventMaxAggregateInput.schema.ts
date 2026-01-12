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
export const TelemetryEventMaxAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventMaxAggregateInputType>;
export const TelemetryEventMaxAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  durationMs: z.literal(true).optional()
}).strict();
export const TelemetryEventAvgAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventAvgAggregateInputType>;
export const TelemetryEventAvgAggregateInputObjectZodSchema = makeSchema();

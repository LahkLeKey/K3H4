import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  durationMs: z.literal(true).optional()
}).strict();
export const TelemetryEventSumAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventSumAggregateInputType>;
export const TelemetryEventSumAggregateInputObjectZodSchema = makeSchema();

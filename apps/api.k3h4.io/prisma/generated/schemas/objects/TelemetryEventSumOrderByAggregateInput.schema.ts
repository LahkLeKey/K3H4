import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  durationMs: SortOrderSchema.optional()
}).strict();
export const TelemetryEventSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventSumOrderByAggregateInput>;
export const TelemetryEventSumOrderByAggregateInputObjectZodSchema = makeSchema();

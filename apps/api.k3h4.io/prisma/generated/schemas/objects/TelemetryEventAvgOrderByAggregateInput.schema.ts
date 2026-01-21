import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  durationMs: SortOrderSchema.optional()
}).strict();
export const TelemetryEventAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventAvgOrderByAggregateInput>;
export const TelemetryEventAvgOrderByAggregateInputObjectZodSchema = makeSchema();

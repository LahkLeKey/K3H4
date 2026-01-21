import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sessionId: SortOrderSchema.optional(),
  eventType: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  durationMs: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const TelemetryEventMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventMinOrderByAggregateInput>;
export const TelemetryEventMinOrderByAggregateInputObjectZodSchema = makeSchema();

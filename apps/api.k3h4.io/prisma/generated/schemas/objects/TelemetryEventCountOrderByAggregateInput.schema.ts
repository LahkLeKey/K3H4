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
  payload: SortOrderSchema.optional(),
  durationMs: SortOrderSchema.optional(),
  error: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const TelemetryEventCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCountOrderByAggregateInput>;
export const TelemetryEventCountOrderByAggregateInputObjectZodSchema = makeSchema();

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
  createdAt: SortOrderSchema.optional()
}).strict();
export const TelemetryEventMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TelemetryEventMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventMaxOrderByAggregateInput>;
export const TelemetryEventMaxOrderByAggregateInputObjectZodSchema = makeSchema();

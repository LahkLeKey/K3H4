import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  lastReleaseOn: SortOrderSchema.optional(),
  lastSyncedAt: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaSyncStateMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateMaxOrderByAggregateInput>;
export const UsdaSyncStateMaxOrderByAggregateInputObjectZodSchema = makeSchema();

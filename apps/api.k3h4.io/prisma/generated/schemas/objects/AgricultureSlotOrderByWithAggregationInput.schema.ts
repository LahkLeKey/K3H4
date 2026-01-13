import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureSlotCountOrderByAggregateInputObjectSchema as AgricultureSlotCountOrderByAggregateInputObjectSchema } from './AgricultureSlotCountOrderByAggregateInput.schema';
import { AgricultureSlotAvgOrderByAggregateInputObjectSchema as AgricultureSlotAvgOrderByAggregateInputObjectSchema } from './AgricultureSlotAvgOrderByAggregateInput.schema';
import { AgricultureSlotMaxOrderByAggregateInputObjectSchema as AgricultureSlotMaxOrderByAggregateInputObjectSchema } from './AgricultureSlotMaxOrderByAggregateInput.schema';
import { AgricultureSlotMinOrderByAggregateInputObjectSchema as AgricultureSlotMinOrderByAggregateInputObjectSchema } from './AgricultureSlotMinOrderByAggregateInput.schema';
import { AgricultureSlotSumOrderByAggregateInputObjectSchema as AgricultureSlotSumOrderByAggregateInputObjectSchema } from './AgricultureSlotSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  slotIndex: SortOrderSchema.optional(),
  unlockedAt: SortOrderSchema.optional(),
  costPaid: SortOrderSchema.optional(),
  plotId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => AgricultureSlotCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AgricultureSlotAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureSlotMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureSlotMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AgricultureSlotSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureSlotOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureSlotOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotOrderByWithAggregationInput>;
export const AgricultureSlotOrderByWithAggregationInputObjectZodSchema = makeSchema();

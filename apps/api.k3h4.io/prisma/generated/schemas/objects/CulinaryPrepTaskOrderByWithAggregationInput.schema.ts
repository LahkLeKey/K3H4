import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CulinaryPrepTaskCountOrderByAggregateInputObjectSchema as CulinaryPrepTaskCountOrderByAggregateInputObjectSchema } from './CulinaryPrepTaskCountOrderByAggregateInput.schema';
import { CulinaryPrepTaskMaxOrderByAggregateInputObjectSchema as CulinaryPrepTaskMaxOrderByAggregateInputObjectSchema } from './CulinaryPrepTaskMaxOrderByAggregateInput.schema';
import { CulinaryPrepTaskMinOrderByAggregateInputObjectSchema as CulinaryPrepTaskMinOrderByAggregateInputObjectSchema } from './CulinaryPrepTaskMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  task: SortOrderSchema.optional(),
  station: SortOrderSchema.optional(),
  dueAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CulinaryPrepTaskCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CulinaryPrepTaskMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CulinaryPrepTaskMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CulinaryPrepTaskOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskOrderByWithAggregationInput>;
export const CulinaryPrepTaskOrderByWithAggregationInputObjectZodSchema = makeSchema();

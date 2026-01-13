import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CulinarySupplierNeedCountOrderByAggregateInputObjectSchema as CulinarySupplierNeedCountOrderByAggregateInputObjectSchema } from './CulinarySupplierNeedCountOrderByAggregateInput.schema';
import { CulinarySupplierNeedMaxOrderByAggregateInputObjectSchema as CulinarySupplierNeedMaxOrderByAggregateInputObjectSchema } from './CulinarySupplierNeedMaxOrderByAggregateInput.schema';
import { CulinarySupplierNeedMinOrderByAggregateInputObjectSchema as CulinarySupplierNeedMinOrderByAggregateInputObjectSchema } from './CulinarySupplierNeedMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  item: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  dueDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CulinarySupplierNeedCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CulinarySupplierNeedMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CulinarySupplierNeedMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CulinarySupplierNeedOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedOrderByWithAggregationInput>;
export const CulinarySupplierNeedOrderByWithAggregationInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaCacheEntryCountOrderByAggregateInputObjectSchema as UsdaCacheEntryCountOrderByAggregateInputObjectSchema } from './UsdaCacheEntryCountOrderByAggregateInput.schema';
import { UsdaCacheEntryMaxOrderByAggregateInputObjectSchema as UsdaCacheEntryMaxOrderByAggregateInputObjectSchema } from './UsdaCacheEntryMaxOrderByAggregateInput.schema';
import { UsdaCacheEntryMinOrderByAggregateInputObjectSchema as UsdaCacheEntryMinOrderByAggregateInputObjectSchema } from './UsdaCacheEntryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaCacheEntryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaCacheEntryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaCacheEntryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaCacheEntryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCacheEntryOrderByWithAggregationInput>;
export const UsdaCacheEntryOrderByWithAggregationInputObjectZodSchema = makeSchema();

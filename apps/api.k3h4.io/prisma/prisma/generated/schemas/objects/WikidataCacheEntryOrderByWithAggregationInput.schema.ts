import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WikidataCacheEntryCountOrderByAggregateInputObjectSchema as WikidataCacheEntryCountOrderByAggregateInputObjectSchema } from './WikidataCacheEntryCountOrderByAggregateInput.schema';
import { WikidataCacheEntryAvgOrderByAggregateInputObjectSchema as WikidataCacheEntryAvgOrderByAggregateInputObjectSchema } from './WikidataCacheEntryAvgOrderByAggregateInput.schema';
import { WikidataCacheEntryMaxOrderByAggregateInputObjectSchema as WikidataCacheEntryMaxOrderByAggregateInputObjectSchema } from './WikidataCacheEntryMaxOrderByAggregateInput.schema';
import { WikidataCacheEntryMinOrderByAggregateInputObjectSchema as WikidataCacheEntryMinOrderByAggregateInputObjectSchema } from './WikidataCacheEntryMinOrderByAggregateInput.schema';
import { WikidataCacheEntrySumOrderByAggregateInputObjectSchema as WikidataCacheEntrySumOrderByAggregateInputObjectSchema } from './WikidataCacheEntrySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  resource: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cacheControlSeconds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  etag: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => WikidataCacheEntryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => WikidataCacheEntryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => WikidataCacheEntryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => WikidataCacheEntryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => WikidataCacheEntrySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const WikidataCacheEntryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryOrderByWithAggregationInput>;
export const WikidataCacheEntryOrderByWithAggregationInputObjectZodSchema = makeSchema();

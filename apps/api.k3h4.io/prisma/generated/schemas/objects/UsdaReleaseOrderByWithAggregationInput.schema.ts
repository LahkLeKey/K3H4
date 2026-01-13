import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaReleaseCountOrderByAggregateInputObjectSchema as UsdaReleaseCountOrderByAggregateInputObjectSchema } from './UsdaReleaseCountOrderByAggregateInput.schema';
import { UsdaReleaseMaxOrderByAggregateInputObjectSchema as UsdaReleaseMaxOrderByAggregateInputObjectSchema } from './UsdaReleaseMaxOrderByAggregateInput.schema';
import { UsdaReleaseMinOrderByAggregateInputObjectSchema as UsdaReleaseMinOrderByAggregateInputObjectSchema } from './UsdaReleaseMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  releasedOn: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaReleaseCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaReleaseMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaReleaseMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaReleaseOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaReleaseOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseOrderByWithAggregationInput>;
export const UsdaReleaseOrderByWithAggregationInputObjectZodSchema = makeSchema();

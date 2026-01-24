import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaCountryCountOrderByAggregateInputObjectSchema as UsdaCountryCountOrderByAggregateInputObjectSchema } from './UsdaCountryCountOrderByAggregateInput.schema';
import { UsdaCountryMaxOrderByAggregateInputObjectSchema as UsdaCountryMaxOrderByAggregateInputObjectSchema } from './UsdaCountryMaxOrderByAggregateInput.schema';
import { UsdaCountryMinOrderByAggregateInputObjectSchema as UsdaCountryMinOrderByAggregateInputObjectSchema } from './UsdaCountryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  regionCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  wikidataId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  enrichment: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extra: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaCountryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaCountryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaCountryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaCountryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaCountryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountryOrderByWithAggregationInput>;
export const UsdaCountryOrderByWithAggregationInputObjectZodSchema = makeSchema();

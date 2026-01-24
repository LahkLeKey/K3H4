import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaUnitCountOrderByAggregateInputObjectSchema as UsdaUnitCountOrderByAggregateInputObjectSchema } from './UsdaUnitCountOrderByAggregateInput.schema';
import { UsdaUnitMaxOrderByAggregateInputObjectSchema as UsdaUnitMaxOrderByAggregateInputObjectSchema } from './UsdaUnitMaxOrderByAggregateInput.schema';
import { UsdaUnitMinOrderByAggregateInputObjectSchema as UsdaUnitMinOrderByAggregateInputObjectSchema } from './UsdaUnitMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  wikidataId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  enrichment: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extra: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaUnitCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaUnitMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaUnitMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaUnitOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaUnitOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaUnitOrderByWithAggregationInput>;
export const UsdaUnitOrderByWithAggregationInputObjectZodSchema = makeSchema();

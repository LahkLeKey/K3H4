import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BuildingCountOrderByAggregateInputObjectSchema as BuildingCountOrderByAggregateInputObjectSchema } from './BuildingCountOrderByAggregateInput.schema';
import { BuildingAvgOrderByAggregateInputObjectSchema as BuildingAvgOrderByAggregateInputObjectSchema } from './BuildingAvgOrderByAggregateInput.schema';
import { BuildingMaxOrderByAggregateInputObjectSchema as BuildingMaxOrderByAggregateInputObjectSchema } from './BuildingMaxOrderByAggregateInput.schema';
import { BuildingMinOrderByAggregateInputObjectSchema as BuildingMinOrderByAggregateInputObjectSchema } from './BuildingMinOrderByAggregateInput.schema';
import { BuildingSumOrderByAggregateInputObjectSchema as BuildingSumOrderByAggregateInputObjectSchema } from './BuildingSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  addressHouseNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressStreet: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressCity: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressPostcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressState: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressCountry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  geometry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => BuildingCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BuildingAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BuildingMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BuildingMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BuildingSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BuildingOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BuildingOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingOrderByWithAggregationInput>;
export const BuildingOrderByWithAggregationInputObjectZodSchema = makeSchema();

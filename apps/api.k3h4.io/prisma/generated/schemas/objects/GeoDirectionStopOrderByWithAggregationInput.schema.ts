import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoDirectionStopCountOrderByAggregateInputObjectSchema as GeoDirectionStopCountOrderByAggregateInputObjectSchema } from './GeoDirectionStopCountOrderByAggregateInput.schema';
import { GeoDirectionStopAvgOrderByAggregateInputObjectSchema as GeoDirectionStopAvgOrderByAggregateInputObjectSchema } from './GeoDirectionStopAvgOrderByAggregateInput.schema';
import { GeoDirectionStopMaxOrderByAggregateInputObjectSchema as GeoDirectionStopMaxOrderByAggregateInputObjectSchema } from './GeoDirectionStopMaxOrderByAggregateInput.schema';
import { GeoDirectionStopMinOrderByAggregateInputObjectSchema as GeoDirectionStopMinOrderByAggregateInputObjectSchema } from './GeoDirectionStopMinOrderByAggregateInput.schema';
import { GeoDirectionStopSumOrderByAggregateInputObjectSchema as GeoDirectionStopSumOrderByAggregateInputObjectSchema } from './GeoDirectionStopSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  directionId: SortOrderSchema.optional(),
  sequence: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  label: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  osmId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoDirectionStopCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoDirectionStopAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoDirectionStopMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoDirectionStopMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoDirectionStopSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoDirectionStopOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopOrderByWithAggregationInput>;
export const GeoDirectionStopOrderByWithAggregationInputObjectZodSchema = makeSchema();

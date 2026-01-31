import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoDirectionCountOrderByAggregateInputObjectSchema as GeoDirectionCountOrderByAggregateInputObjectSchema } from './GeoDirectionCountOrderByAggregateInput.schema';
import { GeoDirectionAvgOrderByAggregateInputObjectSchema as GeoDirectionAvgOrderByAggregateInputObjectSchema } from './GeoDirectionAvgOrderByAggregateInput.schema';
import { GeoDirectionMaxOrderByAggregateInputObjectSchema as GeoDirectionMaxOrderByAggregateInputObjectSchema } from './GeoDirectionMaxOrderByAggregateInput.schema';
import { GeoDirectionMinOrderByAggregateInputObjectSchema as GeoDirectionMinOrderByAggregateInputObjectSchema } from './GeoDirectionMinOrderByAggregateInput.schema';
import { GeoDirectionSumOrderByAggregateInputObjectSchema as GeoDirectionSumOrderByAggregateInputObjectSchema } from './GeoDirectionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  actorId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  provider: SortOrderSchema.optional(),
  profile: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  inputPoints: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  originLat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  originLng: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  destinationLat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  destinationLng: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  distanceMeters: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  durationSeconds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  geometry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  instructions: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  statusMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoDirectionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoDirectionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoDirectionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoDirectionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoDirectionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoDirectionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoDirectionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionOrderByWithAggregationInput>;
export const GeoDirectionOrderByWithAggregationInputObjectZodSchema = makeSchema();

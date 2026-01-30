import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { FreightLoadCountOrderByAggregateInputObjectSchema as FreightLoadCountOrderByAggregateInputObjectSchema } from './FreightLoadCountOrderByAggregateInput.schema';
import { FreightLoadAvgOrderByAggregateInputObjectSchema as FreightLoadAvgOrderByAggregateInputObjectSchema } from './FreightLoadAvgOrderByAggregateInput.schema';
import { FreightLoadMaxOrderByAggregateInputObjectSchema as FreightLoadMaxOrderByAggregateInputObjectSchema } from './FreightLoadMaxOrderByAggregateInput.schema';
import { FreightLoadMinOrderByAggregateInputObjectSchema as FreightLoadMinOrderByAggregateInputObjectSchema } from './FreightLoadMinOrderByAggregateInput.schema';
import { FreightLoadSumOrderByAggregateInputObjectSchema as FreightLoadSumOrderByAggregateInputObjectSchema } from './FreightLoadSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  originName: SortOrderSchema.optional(),
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationName: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  routeGeoJson: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => FreightLoadCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => FreightLoadAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FreightLoadMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FreightLoadMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => FreightLoadSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FreightLoadOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FreightLoadOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadOrderByWithAggregationInput>;
export const FreightLoadOrderByWithAggregationInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureShipmentCountOrderByAggregateInputObjectSchema as AgricultureShipmentCountOrderByAggregateInputObjectSchema } from './AgricultureShipmentCountOrderByAggregateInput.schema';
import { AgricultureShipmentMaxOrderByAggregateInputObjectSchema as AgricultureShipmentMaxOrderByAggregateInputObjectSchema } from './AgricultureShipmentMaxOrderByAggregateInput.schema';
import { AgricultureShipmentMinOrderByAggregateInputObjectSchema as AgricultureShipmentMinOrderByAggregateInputObjectSchema } from './AgricultureShipmentMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  lot: SortOrderSchema.optional(),
  destination: SortOrderSchema.optional(),
  mode: SortOrderSchema.optional(),
  eta: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  freightLoadId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureShipmentCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureShipmentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureShipmentMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentOrderByWithAggregationInput>;
export const AgricultureShipmentOrderByWithAggregationInputObjectZodSchema = makeSchema();

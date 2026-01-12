import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  lot: SortOrderSchema.optional(),
  destination: SortOrderSchema.optional(),
  mode: SortOrderSchema.optional(),
  eta: SortOrderSchema.optional(),
  freightLoadId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureShipmentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCountOrderByAggregateInput>;
export const AgricultureShipmentCountOrderByAggregateInputObjectZodSchema = makeSchema();

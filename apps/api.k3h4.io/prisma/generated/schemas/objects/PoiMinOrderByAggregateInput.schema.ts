import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmType: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  lastSeenAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  buildingId: SortOrderSchema.optional()
}).strict();
export const PoiMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PoiMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiMinOrderByAggregateInput>;
export const PoiMinOrderByAggregateInputObjectZodSchema = makeSchema();

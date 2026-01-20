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
  tags: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  lastSeenAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  buildingId: SortOrderSchema.optional()
}).strict();
export const PoiCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PoiCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiCountOrderByAggregateInput>;
export const PoiCountOrderByAggregateInputObjectZodSchema = makeSchema();

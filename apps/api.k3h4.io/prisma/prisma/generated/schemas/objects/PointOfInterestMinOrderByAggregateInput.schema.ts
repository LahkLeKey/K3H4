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
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PointOfInterestMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PointOfInterestMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PointOfInterestMinOrderByAggregateInput>;
export const PointOfInterestMinOrderByAggregateInputObjectZodSchema = makeSchema();

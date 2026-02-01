import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional()
}).strict();
export const FreightLoadSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FreightLoadSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadSumOrderByAggregateInput>;
export const FreightLoadSumOrderByAggregateInputObjectZodSchema = makeSchema();

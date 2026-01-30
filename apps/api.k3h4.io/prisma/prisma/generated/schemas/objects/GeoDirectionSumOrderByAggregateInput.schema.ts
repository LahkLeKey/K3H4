import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceMeters: SortOrderSchema.optional(),
  durationSeconds: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional()
}).strict();
export const GeoDirectionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSumOrderByAggregateInput>;
export const GeoDirectionSumOrderByAggregateInputObjectZodSchema = makeSchema();

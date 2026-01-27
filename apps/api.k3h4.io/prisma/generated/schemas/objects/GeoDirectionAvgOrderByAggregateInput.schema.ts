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
export const GeoDirectionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionAvgOrderByAggregateInput>;
export const GeoDirectionAvgOrderByAggregateInputObjectZodSchema = makeSchema();

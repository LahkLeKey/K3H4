import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sequence: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional()
}).strict();
export const GeoDirectionStopAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopAvgOrderByAggregateInput>;
export const GeoDirectionStopAvgOrderByAggregateInputObjectZodSchema = makeSchema();

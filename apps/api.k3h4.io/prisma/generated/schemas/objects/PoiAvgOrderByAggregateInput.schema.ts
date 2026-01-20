import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  osmId: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  buildingId: SortOrderSchema.optional()
}).strict();
export const PoiAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PoiAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiAvgOrderByAggregateInput>;
export const PoiAvgOrderByAggregateInputObjectZodSchema = makeSchema();

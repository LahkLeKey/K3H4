import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  directionId: SortOrderSchema.optional(),
  sequence: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  address: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoDirectionStopMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopMaxOrderByAggregateInput>;
export const GeoDirectionStopMaxOrderByAggregateInputObjectZodSchema = makeSchema();

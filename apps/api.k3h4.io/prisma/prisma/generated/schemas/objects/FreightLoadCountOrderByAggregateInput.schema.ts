import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  originName: SortOrderSchema.optional(),
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationName: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  routeGeoJson: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const FreightLoadCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FreightLoadCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCountOrderByAggregateInput>;
export const FreightLoadCountOrderByAggregateInputObjectZodSchema = makeSchema();

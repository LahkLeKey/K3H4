import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  profile: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceMeters: SortOrderSchema.optional(),
  durationSeconds: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  statusMessage: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  routeCacheId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const GeoDirectionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionMaxOrderByAggregateInput>;
export const GeoDirectionMaxOrderByAggregateInputObjectZodSchema = makeSchema();

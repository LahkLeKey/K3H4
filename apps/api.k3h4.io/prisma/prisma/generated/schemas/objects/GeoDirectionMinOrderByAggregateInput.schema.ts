import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
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
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const GeoDirectionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionMinOrderByAggregateInput>;
export const GeoDirectionMinOrderByAggregateInputObjectZodSchema = makeSchema();

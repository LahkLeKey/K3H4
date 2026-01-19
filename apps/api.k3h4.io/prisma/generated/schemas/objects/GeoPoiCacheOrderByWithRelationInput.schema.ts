import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  centerLat: SortOrderSchema.optional(),
  centerLng: SortOrderSchema.optional(),
  radiusM: SortOrderSchema.optional(),
  kinds: SortOrderSchema.optional(),
  pois: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const GeoPoiCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheOrderByWithRelationInput>;
export const GeoPoiCacheOrderByWithRelationInputObjectZodSchema = makeSchema();

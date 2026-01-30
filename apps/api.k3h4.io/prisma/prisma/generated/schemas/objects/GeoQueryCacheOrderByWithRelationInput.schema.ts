import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  params: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  count: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const GeoQueryCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheOrderByWithRelationInput>;
export const GeoQueryCacheOrderByWithRelationInputObjectZodSchema = makeSchema();

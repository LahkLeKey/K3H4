import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  provider: SortOrderSchema.optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  z: SortOrderSchema.optional(),
  x: SortOrderSchema.optional(),
  y: SortOrderSchema.optional(),
  format: SortOrderSchema.optional(),
  url: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  data: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  byteLength: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  etag: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cacheControl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  lastAccessed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const GeoDemTileCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheOrderByWithRelationInput>;
export const GeoDemTileCacheOrderByWithRelationInputObjectZodSchema = makeSchema();

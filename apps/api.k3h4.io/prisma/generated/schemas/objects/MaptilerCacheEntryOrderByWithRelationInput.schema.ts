import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { MaptilerQueryOrderByWithRelationInputObjectSchema as MaptilerQueryOrderByWithRelationInputObjectSchema } from './MaptilerQueryOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  queryId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  kind: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  responseType: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  data: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  contentType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cacheControl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  query: z.lazy(() => MaptilerQueryOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const MaptilerCacheEntryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryOrderByWithRelationInput>;
export const MaptilerCacheEntryOrderByWithRelationInputObjectZodSchema = makeSchema();

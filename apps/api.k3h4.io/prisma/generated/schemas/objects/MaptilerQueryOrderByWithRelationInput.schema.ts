import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema as MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema } from './MaptilerCacheEntryOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastUsedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  cacheEntries: z.lazy(() => MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const MaptilerQueryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MaptilerQueryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryOrderByWithRelationInput>;
export const MaptilerQueryOrderByWithRelationInputObjectZodSchema = makeSchema();

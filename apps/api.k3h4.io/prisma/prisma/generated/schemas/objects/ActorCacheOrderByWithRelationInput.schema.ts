import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ActorOrderByWithRelationInputObjectSchema as ActorOrderByWithRelationInputObjectSchema } from './ActorOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  actor: z.lazy(() => ActorOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ActorCacheOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ActorCacheOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheOrderByWithRelationInput>;
export const ActorCacheOrderByWithRelationInputObjectZodSchema = makeSchema();

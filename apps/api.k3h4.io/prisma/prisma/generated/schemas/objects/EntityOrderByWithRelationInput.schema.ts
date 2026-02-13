import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ActorOrderByWithRelationInputObjectSchema as ActorOrderByWithRelationInputObjectSchema } from './ActorOrderByWithRelationInput.schema';
import { EntityCacheOrderByRelationAggregateInputObjectSchema as EntityCacheOrderByRelationAggregateInputObjectSchema } from './EntityCacheOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  direction: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isGlobal: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  actor: z.lazy(() => ActorOrderByWithRelationInputObjectSchema).optional(),
  caches: z.lazy(() => EntityCacheOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const EntityOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EntityOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityOrderByWithRelationInput>;
export const EntityOrderByWithRelationInputObjectZodSchema = makeSchema();

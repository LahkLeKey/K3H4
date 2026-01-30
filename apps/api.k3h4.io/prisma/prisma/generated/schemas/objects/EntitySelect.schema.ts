import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { EntityCacheFindManySchema as EntityCacheFindManySchema } from '../findManyEntityCache.schema';
import { EntityCountOutputTypeArgsObjectSchema as EntityCountOutputTypeArgsObjectSchema } from './EntityCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  actorId: z.boolean().optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  kind: z.boolean().optional(),
  direction: z.boolean().optional(),
  name: z.boolean().optional(),
  targetType: z.boolean().optional(),
  targetId: z.boolean().optional(),
  source: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  caches: z.union([z.boolean(), z.lazy(() => EntityCacheFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => EntityCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const EntitySelectObjectSchema: z.ZodType<Prisma.EntitySelect> = makeSchema() as unknown as z.ZodType<Prisma.EntitySelect>;
export const EntitySelectObjectZodSchema = makeSchema();

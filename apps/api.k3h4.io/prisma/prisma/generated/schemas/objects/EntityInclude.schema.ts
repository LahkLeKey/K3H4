import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { EntityCacheFindManySchema as EntityCacheFindManySchema } from '../findManyEntityCache.schema';
import { EntityCountOutputTypeArgsObjectSchema as EntityCountOutputTypeArgsObjectSchema } from './EntityCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  caches: z.union([z.boolean(), z.lazy(() => EntityCacheFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => EntityCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const EntityIncludeObjectSchema: z.ZodType<Prisma.EntityInclude> = makeSchema() as unknown as z.ZodType<Prisma.EntityInclude>;
export const EntityIncludeObjectZodSchema = makeSchema();

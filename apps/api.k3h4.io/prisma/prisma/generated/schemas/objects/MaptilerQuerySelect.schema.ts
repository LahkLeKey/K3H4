import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { MaptilerCacheEntryFindManySchema as MaptilerCacheEntryFindManySchema } from '../findManyMaptilerCacheEntry.schema';
import { MaptilerQueryCountOutputTypeArgsObjectSchema as MaptilerQueryCountOutputTypeArgsObjectSchema } from './MaptilerQueryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actorId: z.boolean().optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  signature: z.boolean().optional(),
  kind: z.boolean().optional(),
  path: z.boolean().optional(),
  params: z.boolean().optional(),
  lastUsedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  cacheEntries: z.union([z.boolean(), z.lazy(() => MaptilerCacheEntryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => MaptilerQueryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const MaptilerQuerySelectObjectSchema: z.ZodType<Prisma.MaptilerQuerySelect> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQuerySelect>;
export const MaptilerQuerySelectObjectZodSchema = makeSchema();

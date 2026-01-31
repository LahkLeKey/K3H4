import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { MaptilerCacheEntryFindManySchema as MaptilerCacheEntryFindManySchema } from '../findManyMaptilerCacheEntry.schema';
import { MaptilerQueryCountOutputTypeArgsObjectSchema as MaptilerQueryCountOutputTypeArgsObjectSchema } from './MaptilerQueryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  cacheEntries: z.union([z.boolean(), z.lazy(() => MaptilerCacheEntryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => MaptilerQueryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const MaptilerQueryIncludeObjectSchema: z.ZodType<Prisma.MaptilerQueryInclude> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryInclude>;
export const MaptilerQueryIncludeObjectZodSchema = makeSchema();

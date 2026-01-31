import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { MaptilerQueryArgsObjectSchema as MaptilerQueryArgsObjectSchema } from './MaptilerQueryArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  query: z.union([z.boolean(), z.lazy(() => MaptilerQueryArgsObjectSchema)]).optional()
}).strict();
export const MaptilerCacheEntryIncludeObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryInclude> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryInclude>;
export const MaptilerCacheEntryIncludeObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional()
}).strict();
export const OsrmCacheEntryIncludeObjectSchema: z.ZodType<Prisma.OsrmCacheEntryInclude> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryInclude>;
export const OsrmCacheEntryIncludeObjectZodSchema = makeSchema();

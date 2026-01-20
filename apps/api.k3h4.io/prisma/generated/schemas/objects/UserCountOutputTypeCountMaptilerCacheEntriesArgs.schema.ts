import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereInputObjectSchema as MaptilerCacheEntryWhereInputObjectSchema } from './MaptilerCacheEntryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectZodSchema = makeSchema();

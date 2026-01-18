import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './OsrmCacheEntryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountOsrmCacheEntriesArgsObjectZodSchema = makeSchema();

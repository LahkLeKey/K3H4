import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './OsrmCacheEntryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => OsrmCacheEntryWhereInputObjectSchema).optional(),
  some: z.lazy(() => OsrmCacheEntryWhereInputObjectSchema).optional(),
  none: z.lazy(() => OsrmCacheEntryWhereInputObjectSchema).optional()
}).strict();
export const OsrmCacheEntryListRelationFilterObjectSchema: z.ZodType<Prisma.OsrmCacheEntryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryListRelationFilter>;
export const OsrmCacheEntryListRelationFilterObjectZodSchema = makeSchema();

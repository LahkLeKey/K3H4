import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryWhereInputObjectSchema as MaptilerCacheEntryWhereInputObjectSchema } from './MaptilerCacheEntryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).optional(),
  some: z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).optional(),
  none: z.lazy(() => MaptilerCacheEntryWhereInputObjectSchema).optional()
}).strict();
export const MaptilerCacheEntryListRelationFilterObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryListRelationFilter>;
export const MaptilerCacheEntryListRelationFilterObjectZodSchema = makeSchema();

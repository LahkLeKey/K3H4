import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';

export const OsrmCacheEntryFindUniqueSchema: z.ZodType<Prisma.OsrmCacheEntryFindUniqueArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryFindUniqueArgs>;

export const OsrmCacheEntryFindUniqueZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict();
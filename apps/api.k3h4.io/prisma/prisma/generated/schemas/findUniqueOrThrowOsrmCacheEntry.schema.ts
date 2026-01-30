import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';

export const OsrmCacheEntryFindUniqueOrThrowSchema: z.ZodType<Prisma.OsrmCacheEntryFindUniqueOrThrowArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryFindUniqueOrThrowArgs>;

export const OsrmCacheEntryFindUniqueOrThrowZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict();
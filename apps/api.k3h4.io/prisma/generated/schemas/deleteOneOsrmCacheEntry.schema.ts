import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';

export const OsrmCacheEntryDeleteOneSchema: z.ZodType<Prisma.OsrmCacheEntryDeleteArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryDeleteArgs>;

export const OsrmCacheEntryDeleteOneZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict();
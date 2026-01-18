import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryCreateInputObjectSchema as OsrmCacheEntryCreateInputObjectSchema } from './objects/OsrmCacheEntryCreateInput.schema';
import { OsrmCacheEntryUncheckedCreateInputObjectSchema as OsrmCacheEntryUncheckedCreateInputObjectSchema } from './objects/OsrmCacheEntryUncheckedCreateInput.schema';

export const OsrmCacheEntryCreateOneSchema: z.ZodType<Prisma.OsrmCacheEntryCreateArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), data: z.union([OsrmCacheEntryCreateInputObjectSchema, OsrmCacheEntryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateArgs>;

export const OsrmCacheEntryCreateOneZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), data: z.union([OsrmCacheEntryCreateInputObjectSchema, OsrmCacheEntryUncheckedCreateInputObjectSchema]) }).strict();
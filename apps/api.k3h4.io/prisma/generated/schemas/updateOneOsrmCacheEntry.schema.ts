import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryUpdateInputObjectSchema as OsrmCacheEntryUpdateInputObjectSchema } from './objects/OsrmCacheEntryUpdateInput.schema';
import { OsrmCacheEntryUncheckedUpdateInputObjectSchema as OsrmCacheEntryUncheckedUpdateInputObjectSchema } from './objects/OsrmCacheEntryUncheckedUpdateInput.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';

export const OsrmCacheEntryUpdateOneSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), data: z.union([OsrmCacheEntryUpdateInputObjectSchema, OsrmCacheEntryUncheckedUpdateInputObjectSchema]), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateArgs>;

export const OsrmCacheEntryUpdateOneZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), data: z.union([OsrmCacheEntryUpdateInputObjectSchema, OsrmCacheEntryUncheckedUpdateInputObjectSchema]), where: OsrmCacheEntryWhereUniqueInputObjectSchema }).strict();
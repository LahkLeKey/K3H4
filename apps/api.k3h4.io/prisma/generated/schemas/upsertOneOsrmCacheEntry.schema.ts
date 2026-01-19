import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryCreateInputObjectSchema as OsrmCacheEntryCreateInputObjectSchema } from './objects/OsrmCacheEntryCreateInput.schema';
import { OsrmCacheEntryUncheckedCreateInputObjectSchema as OsrmCacheEntryUncheckedCreateInputObjectSchema } from './objects/OsrmCacheEntryUncheckedCreateInput.schema';
import { OsrmCacheEntryUpdateInputObjectSchema as OsrmCacheEntryUpdateInputObjectSchema } from './objects/OsrmCacheEntryUpdateInput.schema';
import { OsrmCacheEntryUncheckedUpdateInputObjectSchema as OsrmCacheEntryUncheckedUpdateInputObjectSchema } from './objects/OsrmCacheEntryUncheckedUpdateInput.schema';

export const OsrmCacheEntryUpsertOneSchema: z.ZodType<Prisma.OsrmCacheEntryUpsertArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema, create: z.union([ OsrmCacheEntryCreateInputObjectSchema, OsrmCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ OsrmCacheEntryUpdateInputObjectSchema, OsrmCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpsertArgs>;

export const OsrmCacheEntryUpsertOneZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), include: OsrmCacheEntryIncludeObjectSchema.optional(), where: OsrmCacheEntryWhereUniqueInputObjectSchema, create: z.union([ OsrmCacheEntryCreateInputObjectSchema, OsrmCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ OsrmCacheEntryUpdateInputObjectSchema, OsrmCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict();
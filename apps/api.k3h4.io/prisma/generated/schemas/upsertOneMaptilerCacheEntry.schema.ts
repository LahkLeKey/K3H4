import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './objects/MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryIncludeObjectSchema as MaptilerCacheEntryIncludeObjectSchema } from './objects/MaptilerCacheEntryInclude.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './objects/MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryCreateInputObjectSchema as MaptilerCacheEntryCreateInputObjectSchema } from './objects/MaptilerCacheEntryCreateInput.schema';
import { MaptilerCacheEntryUncheckedCreateInputObjectSchema as MaptilerCacheEntryUncheckedCreateInputObjectSchema } from './objects/MaptilerCacheEntryUncheckedCreateInput.schema';
import { MaptilerCacheEntryUpdateInputObjectSchema as MaptilerCacheEntryUpdateInputObjectSchema } from './objects/MaptilerCacheEntryUpdateInput.schema';
import { MaptilerCacheEntryUncheckedUpdateInputObjectSchema as MaptilerCacheEntryUncheckedUpdateInputObjectSchema } from './objects/MaptilerCacheEntryUncheckedUpdateInput.schema';

export const MaptilerCacheEntryUpsertOneSchema: z.ZodType<Prisma.MaptilerCacheEntryUpsertArgs> = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), where: MaptilerCacheEntryWhereUniqueInputObjectSchema, create: z.union([ MaptilerCacheEntryCreateInputObjectSchema, MaptilerCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ MaptilerCacheEntryUpdateInputObjectSchema, MaptilerCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpsertArgs>;

export const MaptilerCacheEntryUpsertOneZodSchema = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), where: MaptilerCacheEntryWhereUniqueInputObjectSchema, create: z.union([ MaptilerCacheEntryCreateInputObjectSchema, MaptilerCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ MaptilerCacheEntryUpdateInputObjectSchema, MaptilerCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict();
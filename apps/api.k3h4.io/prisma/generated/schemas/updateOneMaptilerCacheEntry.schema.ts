import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './objects/MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryIncludeObjectSchema as MaptilerCacheEntryIncludeObjectSchema } from './objects/MaptilerCacheEntryInclude.schema';
import { MaptilerCacheEntryUpdateInputObjectSchema as MaptilerCacheEntryUpdateInputObjectSchema } from './objects/MaptilerCacheEntryUpdateInput.schema';
import { MaptilerCacheEntryUncheckedUpdateInputObjectSchema as MaptilerCacheEntryUncheckedUpdateInputObjectSchema } from './objects/MaptilerCacheEntryUncheckedUpdateInput.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './objects/MaptilerCacheEntryWhereUniqueInput.schema';

export const MaptilerCacheEntryUpdateOneSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateArgs> = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), data: z.union([MaptilerCacheEntryUpdateInputObjectSchema, MaptilerCacheEntryUncheckedUpdateInputObjectSchema]), where: MaptilerCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateArgs>;

export const MaptilerCacheEntryUpdateOneZodSchema = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), data: z.union([MaptilerCacheEntryUpdateInputObjectSchema, MaptilerCacheEntryUncheckedUpdateInputObjectSchema]), where: MaptilerCacheEntryWhereUniqueInputObjectSchema }).strict();
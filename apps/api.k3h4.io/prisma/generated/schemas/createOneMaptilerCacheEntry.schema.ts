import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './objects/MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryIncludeObjectSchema as MaptilerCacheEntryIncludeObjectSchema } from './objects/MaptilerCacheEntryInclude.schema';
import { MaptilerCacheEntryCreateInputObjectSchema as MaptilerCacheEntryCreateInputObjectSchema } from './objects/MaptilerCacheEntryCreateInput.schema';
import { MaptilerCacheEntryUncheckedCreateInputObjectSchema as MaptilerCacheEntryUncheckedCreateInputObjectSchema } from './objects/MaptilerCacheEntryUncheckedCreateInput.schema';

export const MaptilerCacheEntryCreateOneSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateArgs> = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), data: z.union([MaptilerCacheEntryCreateInputObjectSchema, MaptilerCacheEntryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateArgs>;

export const MaptilerCacheEntryCreateOneZodSchema = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), data: z.union([MaptilerCacheEntryCreateInputObjectSchema, MaptilerCacheEntryUncheckedCreateInputObjectSchema]) }).strict();
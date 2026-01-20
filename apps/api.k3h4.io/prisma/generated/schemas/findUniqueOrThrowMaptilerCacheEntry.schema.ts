import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './objects/MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryIncludeObjectSchema as MaptilerCacheEntryIncludeObjectSchema } from './objects/MaptilerCacheEntryInclude.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './objects/MaptilerCacheEntryWhereUniqueInput.schema';

export const MaptilerCacheEntryFindUniqueOrThrowSchema: z.ZodType<Prisma.MaptilerCacheEntryFindUniqueOrThrowArgs> = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), where: MaptilerCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryFindUniqueOrThrowArgs>;

export const MaptilerCacheEntryFindUniqueOrThrowZodSchema = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), include: MaptilerCacheEntryIncludeObjectSchema.optional(), where: MaptilerCacheEntryWhereUniqueInputObjectSchema }).strict();
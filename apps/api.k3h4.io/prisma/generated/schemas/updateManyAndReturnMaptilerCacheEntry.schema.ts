import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './objects/MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryUpdateManyMutationInputObjectSchema as MaptilerCacheEntryUpdateManyMutationInputObjectSchema } from './objects/MaptilerCacheEntryUpdateManyMutationInput.schema';
import { MaptilerCacheEntryWhereInputObjectSchema as MaptilerCacheEntryWhereInputObjectSchema } from './objects/MaptilerCacheEntryWhereInput.schema';

export const MaptilerCacheEntryUpdateManyAndReturnSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateManyAndReturnArgs> = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), data: MaptilerCacheEntryUpdateManyMutationInputObjectSchema, where: MaptilerCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateManyAndReturnArgs>;

export const MaptilerCacheEntryUpdateManyAndReturnZodSchema = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), data: MaptilerCacheEntryUpdateManyMutationInputObjectSchema, where: MaptilerCacheEntryWhereInputObjectSchema.optional() }).strict();
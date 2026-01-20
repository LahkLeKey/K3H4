import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './objects/MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryCreateManyInputObjectSchema as MaptilerCacheEntryCreateManyInputObjectSchema } from './objects/MaptilerCacheEntryCreateManyInput.schema';

export const MaptilerCacheEntryCreateManyAndReturnSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateManyAndReturnArgs> = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), data: z.union([ MaptilerCacheEntryCreateManyInputObjectSchema, z.array(MaptilerCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateManyAndReturnArgs>;

export const MaptilerCacheEntryCreateManyAndReturnZodSchema = z.object({ select: MaptilerCacheEntrySelectObjectSchema.optional(), data: z.union([ MaptilerCacheEntryCreateManyInputObjectSchema, z.array(MaptilerCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
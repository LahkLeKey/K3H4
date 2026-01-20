import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntryCreateManyInputObjectSchema as MaptilerCacheEntryCreateManyInputObjectSchema } from './objects/MaptilerCacheEntryCreateManyInput.schema';

export const MaptilerCacheEntryCreateManySchema: z.ZodType<Prisma.MaptilerCacheEntryCreateManyArgs> = z.object({ data: z.union([ MaptilerCacheEntryCreateManyInputObjectSchema, z.array(MaptilerCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateManyArgs>;

export const MaptilerCacheEntryCreateManyZodSchema = z.object({ data: z.union([ MaptilerCacheEntryCreateManyInputObjectSchema, z.array(MaptilerCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
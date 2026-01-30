import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './objects/ApiCacheEntrySelect.schema';
import { ApiCacheEntryCreateManyInputObjectSchema as ApiCacheEntryCreateManyInputObjectSchema } from './objects/ApiCacheEntryCreateManyInput.schema';

export const ApiCacheEntryCreateManyAndReturnSchema: z.ZodType<Prisma.ApiCacheEntryCreateManyAndReturnArgs> = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(), data: z.union([ ApiCacheEntryCreateManyInputObjectSchema, z.array(ApiCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryCreateManyAndReturnArgs>;

export const ApiCacheEntryCreateManyAndReturnZodSchema = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(), data: z.union([ ApiCacheEntryCreateManyInputObjectSchema, z.array(ApiCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
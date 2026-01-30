import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntryCreateManyInputObjectSchema as ApiCacheEntryCreateManyInputObjectSchema } from './objects/ApiCacheEntryCreateManyInput.schema';

export const ApiCacheEntryCreateManySchema: z.ZodType<Prisma.ApiCacheEntryCreateManyArgs> = z.object({ data: z.union([ ApiCacheEntryCreateManyInputObjectSchema, z.array(ApiCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryCreateManyArgs>;

export const ApiCacheEntryCreateManyZodSchema = z.object({ data: z.union([ ApiCacheEntryCreateManyInputObjectSchema, z.array(ApiCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
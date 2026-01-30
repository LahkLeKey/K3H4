import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntryUpdateManyMutationInputObjectSchema as ApiCacheEntryUpdateManyMutationInputObjectSchema } from './objects/ApiCacheEntryUpdateManyMutationInput.schema';
import { ApiCacheEntryWhereInputObjectSchema as ApiCacheEntryWhereInputObjectSchema } from './objects/ApiCacheEntryWhereInput.schema';

export const ApiCacheEntryUpdateManySchema: z.ZodType<Prisma.ApiCacheEntryUpdateManyArgs> = z.object({ data: ApiCacheEntryUpdateManyMutationInputObjectSchema, where: ApiCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryUpdateManyArgs>;

export const ApiCacheEntryUpdateManyZodSchema = z.object({ data: ApiCacheEntryUpdateManyMutationInputObjectSchema, where: ApiCacheEntryWhereInputObjectSchema.optional() }).strict();
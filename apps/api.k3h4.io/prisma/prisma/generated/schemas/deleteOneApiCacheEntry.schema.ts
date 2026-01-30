import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './objects/ApiCacheEntrySelect.schema';
import { ApiCacheEntryWhereUniqueInputObjectSchema as ApiCacheEntryWhereUniqueInputObjectSchema } from './objects/ApiCacheEntryWhereUniqueInput.schema';

export const ApiCacheEntryDeleteOneSchema: z.ZodType<Prisma.ApiCacheEntryDeleteArgs> = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  where: ApiCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryDeleteArgs>;

export const ApiCacheEntryDeleteOneZodSchema = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  where: ApiCacheEntryWhereUniqueInputObjectSchema }).strict();
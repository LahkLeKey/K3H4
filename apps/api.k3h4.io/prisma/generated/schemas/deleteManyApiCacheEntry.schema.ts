import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntryWhereInputObjectSchema as ApiCacheEntryWhereInputObjectSchema } from './objects/ApiCacheEntryWhereInput.schema';

export const ApiCacheEntryDeleteManySchema: z.ZodType<Prisma.ApiCacheEntryDeleteManyArgs> = z.object({ where: ApiCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryDeleteManyArgs>;

export const ApiCacheEntryDeleteManyZodSchema = z.object({ where: ApiCacheEntryWhereInputObjectSchema.optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './objects/ApiCacheEntrySelect.schema';
import { ApiCacheEntryUpdateManyMutationInputObjectSchema as ApiCacheEntryUpdateManyMutationInputObjectSchema } from './objects/ApiCacheEntryUpdateManyMutationInput.schema';
import { ApiCacheEntryWhereInputObjectSchema as ApiCacheEntryWhereInputObjectSchema } from './objects/ApiCacheEntryWhereInput.schema';

export const ApiCacheEntryUpdateManyAndReturnSchema: z.ZodType<Prisma.ApiCacheEntryUpdateManyAndReturnArgs> = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(), data: ApiCacheEntryUpdateManyMutationInputObjectSchema, where: ApiCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryUpdateManyAndReturnArgs>;

export const ApiCacheEntryUpdateManyAndReturnZodSchema = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(), data: ApiCacheEntryUpdateManyMutationInputObjectSchema, where: ApiCacheEntryWhereInputObjectSchema.optional() }).strict();
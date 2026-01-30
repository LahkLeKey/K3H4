import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './objects/ApiCacheEntrySelect.schema';
import { ApiCacheEntryUpdateInputObjectSchema as ApiCacheEntryUpdateInputObjectSchema } from './objects/ApiCacheEntryUpdateInput.schema';
import { ApiCacheEntryUncheckedUpdateInputObjectSchema as ApiCacheEntryUncheckedUpdateInputObjectSchema } from './objects/ApiCacheEntryUncheckedUpdateInput.schema';
import { ApiCacheEntryWhereUniqueInputObjectSchema as ApiCacheEntryWhereUniqueInputObjectSchema } from './objects/ApiCacheEntryWhereUniqueInput.schema';

export const ApiCacheEntryUpdateOneSchema: z.ZodType<Prisma.ApiCacheEntryUpdateArgs> = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  data: z.union([ApiCacheEntryUpdateInputObjectSchema, ApiCacheEntryUncheckedUpdateInputObjectSchema]), where: ApiCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryUpdateArgs>;

export const ApiCacheEntryUpdateOneZodSchema = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  data: z.union([ApiCacheEntryUpdateInputObjectSchema, ApiCacheEntryUncheckedUpdateInputObjectSchema]), where: ApiCacheEntryWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './objects/ApiCacheEntrySelect.schema';
import { ApiCacheEntryCreateInputObjectSchema as ApiCacheEntryCreateInputObjectSchema } from './objects/ApiCacheEntryCreateInput.schema';
import { ApiCacheEntryUncheckedCreateInputObjectSchema as ApiCacheEntryUncheckedCreateInputObjectSchema } from './objects/ApiCacheEntryUncheckedCreateInput.schema';

export const ApiCacheEntryCreateOneSchema: z.ZodType<Prisma.ApiCacheEntryCreateArgs> = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  data: z.union([ApiCacheEntryCreateInputObjectSchema, ApiCacheEntryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryCreateArgs>;

export const ApiCacheEntryCreateOneZodSchema = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  data: z.union([ApiCacheEntryCreateInputObjectSchema, ApiCacheEntryUncheckedCreateInputObjectSchema]) }).strict();
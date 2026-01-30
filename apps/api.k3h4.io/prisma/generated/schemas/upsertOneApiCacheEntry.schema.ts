import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './objects/ApiCacheEntrySelect.schema';
import { ApiCacheEntryWhereUniqueInputObjectSchema as ApiCacheEntryWhereUniqueInputObjectSchema } from './objects/ApiCacheEntryWhereUniqueInput.schema';
import { ApiCacheEntryCreateInputObjectSchema as ApiCacheEntryCreateInputObjectSchema } from './objects/ApiCacheEntryCreateInput.schema';
import { ApiCacheEntryUncheckedCreateInputObjectSchema as ApiCacheEntryUncheckedCreateInputObjectSchema } from './objects/ApiCacheEntryUncheckedCreateInput.schema';
import { ApiCacheEntryUpdateInputObjectSchema as ApiCacheEntryUpdateInputObjectSchema } from './objects/ApiCacheEntryUpdateInput.schema';
import { ApiCacheEntryUncheckedUpdateInputObjectSchema as ApiCacheEntryUncheckedUpdateInputObjectSchema } from './objects/ApiCacheEntryUncheckedUpdateInput.schema';

export const ApiCacheEntryUpsertOneSchema: z.ZodType<Prisma.ApiCacheEntryUpsertArgs> = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  where: ApiCacheEntryWhereUniqueInputObjectSchema, create: z.union([ ApiCacheEntryCreateInputObjectSchema, ApiCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ ApiCacheEntryUpdateInputObjectSchema, ApiCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryUpsertArgs>;

export const ApiCacheEntryUpsertOneZodSchema = z.object({ select: ApiCacheEntrySelectObjectSchema.optional(),  where: ApiCacheEntryWhereUniqueInputObjectSchema, create: z.union([ ApiCacheEntryCreateInputObjectSchema, ApiCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ ApiCacheEntryUpdateInputObjectSchema, ApiCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict();
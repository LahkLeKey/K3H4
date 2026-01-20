import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntryUpdateManyMutationInputObjectSchema as MaptilerCacheEntryUpdateManyMutationInputObjectSchema } from './objects/MaptilerCacheEntryUpdateManyMutationInput.schema';
import { MaptilerCacheEntryWhereInputObjectSchema as MaptilerCacheEntryWhereInputObjectSchema } from './objects/MaptilerCacheEntryWhereInput.schema';

export const MaptilerCacheEntryUpdateManySchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateManyArgs> = z.object({ data: MaptilerCacheEntryUpdateManyMutationInputObjectSchema, where: MaptilerCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateManyArgs>;

export const MaptilerCacheEntryUpdateManyZodSchema = z.object({ data: MaptilerCacheEntryUpdateManyMutationInputObjectSchema, where: MaptilerCacheEntryWhereInputObjectSchema.optional() }).strict();
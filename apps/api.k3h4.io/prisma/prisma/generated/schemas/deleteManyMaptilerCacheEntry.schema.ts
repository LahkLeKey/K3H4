import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntryWhereInputObjectSchema as MaptilerCacheEntryWhereInputObjectSchema } from './objects/MaptilerCacheEntryWhereInput.schema';

export const MaptilerCacheEntryDeleteManySchema: z.ZodType<Prisma.MaptilerCacheEntryDeleteManyArgs> = z.object({ where: MaptilerCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryDeleteManyArgs>;

export const MaptilerCacheEntryDeleteManyZodSchema = z.object({ where: MaptilerCacheEntryWhereInputObjectSchema.optional() }).strict();
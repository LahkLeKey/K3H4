import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './objects/OsrmCacheEntryWhereInput.schema';

export const OsrmCacheEntryDeleteManySchema: z.ZodType<Prisma.OsrmCacheEntryDeleteManyArgs> = z.object({ where: OsrmCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryDeleteManyArgs>;

export const OsrmCacheEntryDeleteManyZodSchema = z.object({ where: OsrmCacheEntryWhereInputObjectSchema.optional() }).strict();
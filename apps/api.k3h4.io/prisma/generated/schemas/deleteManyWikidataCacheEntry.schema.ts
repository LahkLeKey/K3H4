import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntryWhereInputObjectSchema as WikidataCacheEntryWhereInputObjectSchema } from './objects/WikidataCacheEntryWhereInput.schema';

export const WikidataCacheEntryDeleteManySchema: z.ZodType<Prisma.WikidataCacheEntryDeleteManyArgs> = z.object({ where: WikidataCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryDeleteManyArgs>;

export const WikidataCacheEntryDeleteManyZodSchema = z.object({ where: WikidataCacheEntryWhereInputObjectSchema.optional() }).strict();
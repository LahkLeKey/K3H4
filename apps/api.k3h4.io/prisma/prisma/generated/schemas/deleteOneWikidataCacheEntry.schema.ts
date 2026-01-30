import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryWhereUniqueInputObjectSchema as WikidataCacheEntryWhereUniqueInputObjectSchema } from './objects/WikidataCacheEntryWhereUniqueInput.schema';

export const WikidataCacheEntryDeleteOneSchema: z.ZodType<Prisma.WikidataCacheEntryDeleteArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  where: WikidataCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryDeleteArgs>;

export const WikidataCacheEntryDeleteOneZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  where: WikidataCacheEntryWhereUniqueInputObjectSchema }).strict();
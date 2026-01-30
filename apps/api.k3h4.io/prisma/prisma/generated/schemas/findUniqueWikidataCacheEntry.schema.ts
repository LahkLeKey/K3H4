import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryWhereUniqueInputObjectSchema as WikidataCacheEntryWhereUniqueInputObjectSchema } from './objects/WikidataCacheEntryWhereUniqueInput.schema';

export const WikidataCacheEntryFindUniqueSchema: z.ZodType<Prisma.WikidataCacheEntryFindUniqueArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  where: WikidataCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryFindUniqueArgs>;

export const WikidataCacheEntryFindUniqueZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  where: WikidataCacheEntryWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryCreateManyInputObjectSchema as WikidataCacheEntryCreateManyInputObjectSchema } from './objects/WikidataCacheEntryCreateManyInput.schema';

export const WikidataCacheEntryCreateManyAndReturnSchema: z.ZodType<Prisma.WikidataCacheEntryCreateManyAndReturnArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(), data: z.union([ WikidataCacheEntryCreateManyInputObjectSchema, z.array(WikidataCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryCreateManyAndReturnArgs>;

export const WikidataCacheEntryCreateManyAndReturnZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(), data: z.union([ WikidataCacheEntryCreateManyInputObjectSchema, z.array(WikidataCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
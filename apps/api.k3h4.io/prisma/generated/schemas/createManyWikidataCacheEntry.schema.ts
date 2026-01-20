import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntryCreateManyInputObjectSchema as WikidataCacheEntryCreateManyInputObjectSchema } from './objects/WikidataCacheEntryCreateManyInput.schema';

export const WikidataCacheEntryCreateManySchema: z.ZodType<Prisma.WikidataCacheEntryCreateManyArgs> = z.object({ data: z.union([ WikidataCacheEntryCreateManyInputObjectSchema, z.array(WikidataCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryCreateManyArgs>;

export const WikidataCacheEntryCreateManyZodSchema = z.object({ data: z.union([ WikidataCacheEntryCreateManyInputObjectSchema, z.array(WikidataCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
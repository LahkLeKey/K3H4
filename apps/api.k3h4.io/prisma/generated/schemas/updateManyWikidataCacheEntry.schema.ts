import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntryUpdateManyMutationInputObjectSchema as WikidataCacheEntryUpdateManyMutationInputObjectSchema } from './objects/WikidataCacheEntryUpdateManyMutationInput.schema';
import { WikidataCacheEntryWhereInputObjectSchema as WikidataCacheEntryWhereInputObjectSchema } from './objects/WikidataCacheEntryWhereInput.schema';

export const WikidataCacheEntryUpdateManySchema: z.ZodType<Prisma.WikidataCacheEntryUpdateManyArgs> = z.object({ data: WikidataCacheEntryUpdateManyMutationInputObjectSchema, where: WikidataCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryUpdateManyArgs>;

export const WikidataCacheEntryUpdateManyZodSchema = z.object({ data: WikidataCacheEntryUpdateManyMutationInputObjectSchema, where: WikidataCacheEntryWhereInputObjectSchema.optional() }).strict();
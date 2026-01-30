import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryUpdateManyMutationInputObjectSchema as WikidataCacheEntryUpdateManyMutationInputObjectSchema } from './objects/WikidataCacheEntryUpdateManyMutationInput.schema';
import { WikidataCacheEntryWhereInputObjectSchema as WikidataCacheEntryWhereInputObjectSchema } from './objects/WikidataCacheEntryWhereInput.schema';

export const WikidataCacheEntryUpdateManyAndReturnSchema: z.ZodType<Prisma.WikidataCacheEntryUpdateManyAndReturnArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(), data: WikidataCacheEntryUpdateManyMutationInputObjectSchema, where: WikidataCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryUpdateManyAndReturnArgs>;

export const WikidataCacheEntryUpdateManyAndReturnZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(), data: WikidataCacheEntryUpdateManyMutationInputObjectSchema, where: WikidataCacheEntryWhereInputObjectSchema.optional() }).strict();
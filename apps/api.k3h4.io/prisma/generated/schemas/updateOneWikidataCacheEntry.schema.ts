import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryUpdateInputObjectSchema as WikidataCacheEntryUpdateInputObjectSchema } from './objects/WikidataCacheEntryUpdateInput.schema';
import { WikidataCacheEntryUncheckedUpdateInputObjectSchema as WikidataCacheEntryUncheckedUpdateInputObjectSchema } from './objects/WikidataCacheEntryUncheckedUpdateInput.schema';
import { WikidataCacheEntryWhereUniqueInputObjectSchema as WikidataCacheEntryWhereUniqueInputObjectSchema } from './objects/WikidataCacheEntryWhereUniqueInput.schema';

export const WikidataCacheEntryUpdateOneSchema: z.ZodType<Prisma.WikidataCacheEntryUpdateArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  data: z.union([WikidataCacheEntryUpdateInputObjectSchema, WikidataCacheEntryUncheckedUpdateInputObjectSchema]), where: WikidataCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryUpdateArgs>;

export const WikidataCacheEntryUpdateOneZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  data: z.union([WikidataCacheEntryUpdateInputObjectSchema, WikidataCacheEntryUncheckedUpdateInputObjectSchema]), where: WikidataCacheEntryWhereUniqueInputObjectSchema }).strict();
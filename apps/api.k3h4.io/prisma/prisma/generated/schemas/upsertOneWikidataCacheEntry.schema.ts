import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryWhereUniqueInputObjectSchema as WikidataCacheEntryWhereUniqueInputObjectSchema } from './objects/WikidataCacheEntryWhereUniqueInput.schema';
import { WikidataCacheEntryCreateInputObjectSchema as WikidataCacheEntryCreateInputObjectSchema } from './objects/WikidataCacheEntryCreateInput.schema';
import { WikidataCacheEntryUncheckedCreateInputObjectSchema as WikidataCacheEntryUncheckedCreateInputObjectSchema } from './objects/WikidataCacheEntryUncheckedCreateInput.schema';
import { WikidataCacheEntryUpdateInputObjectSchema as WikidataCacheEntryUpdateInputObjectSchema } from './objects/WikidataCacheEntryUpdateInput.schema';
import { WikidataCacheEntryUncheckedUpdateInputObjectSchema as WikidataCacheEntryUncheckedUpdateInputObjectSchema } from './objects/WikidataCacheEntryUncheckedUpdateInput.schema';

export const WikidataCacheEntryUpsertOneSchema: z.ZodType<Prisma.WikidataCacheEntryUpsertArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  where: WikidataCacheEntryWhereUniqueInputObjectSchema, create: z.union([ WikidataCacheEntryCreateInputObjectSchema, WikidataCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ WikidataCacheEntryUpdateInputObjectSchema, WikidataCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryUpsertArgs>;

export const WikidataCacheEntryUpsertOneZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  where: WikidataCacheEntryWhereUniqueInputObjectSchema, create: z.union([ WikidataCacheEntryCreateInputObjectSchema, WikidataCacheEntryUncheckedCreateInputObjectSchema ]), update: z.union([ WikidataCacheEntryUpdateInputObjectSchema, WikidataCacheEntryUncheckedUpdateInputObjectSchema ]) }).strict();
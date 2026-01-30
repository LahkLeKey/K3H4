import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './objects/WikidataCacheEntrySelect.schema';
import { WikidataCacheEntryCreateInputObjectSchema as WikidataCacheEntryCreateInputObjectSchema } from './objects/WikidataCacheEntryCreateInput.schema';
import { WikidataCacheEntryUncheckedCreateInputObjectSchema as WikidataCacheEntryUncheckedCreateInputObjectSchema } from './objects/WikidataCacheEntryUncheckedCreateInput.schema';

export const WikidataCacheEntryCreateOneSchema: z.ZodType<Prisma.WikidataCacheEntryCreateArgs> = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  data: z.union([WikidataCacheEntryCreateInputObjectSchema, WikidataCacheEntryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryCreateArgs>;

export const WikidataCacheEntryCreateOneZodSchema = z.object({ select: WikidataCacheEntrySelectObjectSchema.optional(),  data: z.union([WikidataCacheEntryCreateInputObjectSchema, WikidataCacheEntryUncheckedCreateInputObjectSchema]) }).strict();
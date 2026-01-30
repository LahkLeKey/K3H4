import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './objects/PoiSelect.schema';
import { PoiIncludeObjectSchema as PoiIncludeObjectSchema } from './objects/PoiInclude.schema';
import { PoiCreateInputObjectSchema as PoiCreateInputObjectSchema } from './objects/PoiCreateInput.schema';
import { PoiUncheckedCreateInputObjectSchema as PoiUncheckedCreateInputObjectSchema } from './objects/PoiUncheckedCreateInput.schema';

export const PoiCreateOneSchema: z.ZodType<Prisma.PoiCreateArgs> = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), data: z.union([PoiCreateInputObjectSchema, PoiUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PoiCreateArgs>;

export const PoiCreateOneZodSchema = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), data: z.union([PoiCreateInputObjectSchema, PoiUncheckedCreateInputObjectSchema]) }).strict();
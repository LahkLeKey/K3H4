import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './objects/PoiSelect.schema';
import { PoiIncludeObjectSchema as PoiIncludeObjectSchema } from './objects/PoiInclude.schema';
import { PoiUpdateInputObjectSchema as PoiUpdateInputObjectSchema } from './objects/PoiUpdateInput.schema';
import { PoiUncheckedUpdateInputObjectSchema as PoiUncheckedUpdateInputObjectSchema } from './objects/PoiUncheckedUpdateInput.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './objects/PoiWhereUniqueInput.schema';

export const PoiUpdateOneSchema: z.ZodType<Prisma.PoiUpdateArgs> = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), data: z.union([PoiUpdateInputObjectSchema, PoiUncheckedUpdateInputObjectSchema]), where: PoiWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PoiUpdateArgs>;

export const PoiUpdateOneZodSchema = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), data: z.union([PoiUpdateInputObjectSchema, PoiUncheckedUpdateInputObjectSchema]), where: PoiWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './objects/PoiSelect.schema';
import { PoiIncludeObjectSchema as PoiIncludeObjectSchema } from './objects/PoiInclude.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './objects/PoiWhereUniqueInput.schema';

export const PoiDeleteOneSchema: z.ZodType<Prisma.PoiDeleteArgs> = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), where: PoiWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PoiDeleteArgs>;

export const PoiDeleteOneZodSchema = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), where: PoiWhereUniqueInputObjectSchema }).strict();
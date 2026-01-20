import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './objects/PoiSelect.schema';
import { PoiIncludeObjectSchema as PoiIncludeObjectSchema } from './objects/PoiInclude.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './objects/PoiWhereUniqueInput.schema';
import { PoiCreateInputObjectSchema as PoiCreateInputObjectSchema } from './objects/PoiCreateInput.schema';
import { PoiUncheckedCreateInputObjectSchema as PoiUncheckedCreateInputObjectSchema } from './objects/PoiUncheckedCreateInput.schema';
import { PoiUpdateInputObjectSchema as PoiUpdateInputObjectSchema } from './objects/PoiUpdateInput.schema';
import { PoiUncheckedUpdateInputObjectSchema as PoiUncheckedUpdateInputObjectSchema } from './objects/PoiUncheckedUpdateInput.schema';

export const PoiUpsertOneSchema: z.ZodType<Prisma.PoiUpsertArgs> = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), where: PoiWhereUniqueInputObjectSchema, create: z.union([ PoiCreateInputObjectSchema, PoiUncheckedCreateInputObjectSchema ]), update: z.union([ PoiUpdateInputObjectSchema, PoiUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PoiUpsertArgs>;

export const PoiUpsertOneZodSchema = z.object({ select: PoiSelectObjectSchema.optional(), include: PoiIncludeObjectSchema.optional(), where: PoiWhereUniqueInputObjectSchema, create: z.union([ PoiCreateInputObjectSchema, PoiUncheckedCreateInputObjectSchema ]), update: z.union([ PoiUpdateInputObjectSchema, PoiUncheckedUpdateInputObjectSchema ]) }).strict();
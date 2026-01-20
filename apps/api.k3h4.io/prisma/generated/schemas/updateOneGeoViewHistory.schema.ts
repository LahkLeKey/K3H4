import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './objects/GeoViewHistorySelect.schema';
import { GeoViewHistoryIncludeObjectSchema as GeoViewHistoryIncludeObjectSchema } from './objects/GeoViewHistoryInclude.schema';
import { GeoViewHistoryUpdateInputObjectSchema as GeoViewHistoryUpdateInputObjectSchema } from './objects/GeoViewHistoryUpdateInput.schema';
import { GeoViewHistoryUncheckedUpdateInputObjectSchema as GeoViewHistoryUncheckedUpdateInputObjectSchema } from './objects/GeoViewHistoryUncheckedUpdateInput.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './objects/GeoViewHistoryWhereUniqueInput.schema';

export const GeoViewHistoryUpdateOneSchema: z.ZodType<Prisma.GeoViewHistoryUpdateArgs> = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), data: z.union([GeoViewHistoryUpdateInputObjectSchema, GeoViewHistoryUncheckedUpdateInputObjectSchema]), where: GeoViewHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryUpdateArgs>;

export const GeoViewHistoryUpdateOneZodSchema = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), data: z.union([GeoViewHistoryUpdateInputObjectSchema, GeoViewHistoryUncheckedUpdateInputObjectSchema]), where: GeoViewHistoryWhereUniqueInputObjectSchema }).strict();
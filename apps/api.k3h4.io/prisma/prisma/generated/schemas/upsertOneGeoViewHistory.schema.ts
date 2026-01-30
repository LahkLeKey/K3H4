import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './objects/GeoViewHistorySelect.schema';
import { GeoViewHistoryIncludeObjectSchema as GeoViewHistoryIncludeObjectSchema } from './objects/GeoViewHistoryInclude.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './objects/GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryCreateInputObjectSchema as GeoViewHistoryCreateInputObjectSchema } from './objects/GeoViewHistoryCreateInput.schema';
import { GeoViewHistoryUncheckedCreateInputObjectSchema as GeoViewHistoryUncheckedCreateInputObjectSchema } from './objects/GeoViewHistoryUncheckedCreateInput.schema';
import { GeoViewHistoryUpdateInputObjectSchema as GeoViewHistoryUpdateInputObjectSchema } from './objects/GeoViewHistoryUpdateInput.schema';
import { GeoViewHistoryUncheckedUpdateInputObjectSchema as GeoViewHistoryUncheckedUpdateInputObjectSchema } from './objects/GeoViewHistoryUncheckedUpdateInput.schema';

export const GeoViewHistoryUpsertOneSchema: z.ZodType<Prisma.GeoViewHistoryUpsertArgs> = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), where: GeoViewHistoryWhereUniqueInputObjectSchema, create: z.union([ GeoViewHistoryCreateInputObjectSchema, GeoViewHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ GeoViewHistoryUpdateInputObjectSchema, GeoViewHistoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryUpsertArgs>;

export const GeoViewHistoryUpsertOneZodSchema = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), where: GeoViewHistoryWhereUniqueInputObjectSchema, create: z.union([ GeoViewHistoryCreateInputObjectSchema, GeoViewHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ GeoViewHistoryUpdateInputObjectSchema, GeoViewHistoryUncheckedUpdateInputObjectSchema ]) }).strict();
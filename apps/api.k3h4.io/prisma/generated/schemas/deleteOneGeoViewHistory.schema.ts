import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './objects/GeoViewHistorySelect.schema';
import { GeoViewHistoryIncludeObjectSchema as GeoViewHistoryIncludeObjectSchema } from './objects/GeoViewHistoryInclude.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './objects/GeoViewHistoryWhereUniqueInput.schema';

export const GeoViewHistoryDeleteOneSchema: z.ZodType<Prisma.GeoViewHistoryDeleteArgs> = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), where: GeoViewHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryDeleteArgs>;

export const GeoViewHistoryDeleteOneZodSchema = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), where: GeoViewHistoryWhereUniqueInputObjectSchema }).strict();
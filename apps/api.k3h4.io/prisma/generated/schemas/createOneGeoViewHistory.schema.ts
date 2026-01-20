import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './objects/GeoViewHistorySelect.schema';
import { GeoViewHistoryIncludeObjectSchema as GeoViewHistoryIncludeObjectSchema } from './objects/GeoViewHistoryInclude.schema';
import { GeoViewHistoryCreateInputObjectSchema as GeoViewHistoryCreateInputObjectSchema } from './objects/GeoViewHistoryCreateInput.schema';
import { GeoViewHistoryUncheckedCreateInputObjectSchema as GeoViewHistoryUncheckedCreateInputObjectSchema } from './objects/GeoViewHistoryUncheckedCreateInput.schema';

export const GeoViewHistoryCreateOneSchema: z.ZodType<Prisma.GeoViewHistoryCreateArgs> = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), data: z.union([GeoViewHistoryCreateInputObjectSchema, GeoViewHistoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateArgs>;

export const GeoViewHistoryCreateOneZodSchema = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), include: GeoViewHistoryIncludeObjectSchema.optional(), data: z.union([GeoViewHistoryCreateInputObjectSchema, GeoViewHistoryUncheckedCreateInputObjectSchema]) }).strict();
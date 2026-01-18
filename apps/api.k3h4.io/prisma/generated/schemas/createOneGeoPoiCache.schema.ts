import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './objects/GeoPoiCacheSelect.schema';
import { GeoPoiCacheIncludeObjectSchema as GeoPoiCacheIncludeObjectSchema } from './objects/GeoPoiCacheInclude.schema';
import { GeoPoiCacheCreateInputObjectSchema as GeoPoiCacheCreateInputObjectSchema } from './objects/GeoPoiCacheCreateInput.schema';
import { GeoPoiCacheUncheckedCreateInputObjectSchema as GeoPoiCacheUncheckedCreateInputObjectSchema } from './objects/GeoPoiCacheUncheckedCreateInput.schema';

export const GeoPoiCacheCreateOneSchema: z.ZodType<Prisma.GeoPoiCacheCreateArgs> = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), data: z.union([GeoPoiCacheCreateInputObjectSchema, GeoPoiCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateArgs>;

export const GeoPoiCacheCreateOneZodSchema = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), data: z.union([GeoPoiCacheCreateInputObjectSchema, GeoPoiCacheUncheckedCreateInputObjectSchema]) }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './objects/GeoPoiCacheSelect.schema';
import { GeoPoiCacheIncludeObjectSchema as GeoPoiCacheIncludeObjectSchema } from './objects/GeoPoiCacheInclude.schema';
import { GeoPoiCacheUpdateInputObjectSchema as GeoPoiCacheUpdateInputObjectSchema } from './objects/GeoPoiCacheUpdateInput.schema';
import { GeoPoiCacheUncheckedUpdateInputObjectSchema as GeoPoiCacheUncheckedUpdateInputObjectSchema } from './objects/GeoPoiCacheUncheckedUpdateInput.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './objects/GeoPoiCacheWhereUniqueInput.schema';

export const GeoPoiCacheUpdateOneSchema: z.ZodType<Prisma.GeoPoiCacheUpdateArgs> = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), data: z.union([GeoPoiCacheUpdateInputObjectSchema, GeoPoiCacheUncheckedUpdateInputObjectSchema]), where: GeoPoiCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheUpdateArgs>;

export const GeoPoiCacheUpdateOneZodSchema = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), data: z.union([GeoPoiCacheUpdateInputObjectSchema, GeoPoiCacheUncheckedUpdateInputObjectSchema]), where: GeoPoiCacheWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './objects/GeoPoiCacheSelect.schema';
import { GeoPoiCacheIncludeObjectSchema as GeoPoiCacheIncludeObjectSchema } from './objects/GeoPoiCacheInclude.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './objects/GeoPoiCacheWhereUniqueInput.schema';

export const GeoPoiCacheFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoPoiCacheFindUniqueOrThrowArgs> = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), where: GeoPoiCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheFindUniqueOrThrowArgs>;

export const GeoPoiCacheFindUniqueOrThrowZodSchema = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), where: GeoPoiCacheWhereUniqueInputObjectSchema }).strict();
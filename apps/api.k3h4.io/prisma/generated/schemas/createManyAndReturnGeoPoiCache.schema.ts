import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './objects/GeoPoiCacheSelect.schema';
import { GeoPoiCacheCreateManyInputObjectSchema as GeoPoiCacheCreateManyInputObjectSchema } from './objects/GeoPoiCacheCreateManyInput.schema';

export const GeoPoiCacheCreateManyAndReturnSchema: z.ZodType<Prisma.GeoPoiCacheCreateManyAndReturnArgs> = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), data: z.union([ GeoPoiCacheCreateManyInputObjectSchema, z.array(GeoPoiCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateManyAndReturnArgs>;

export const GeoPoiCacheCreateManyAndReturnZodSchema = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), data: z.union([ GeoPoiCacheCreateManyInputObjectSchema, z.array(GeoPoiCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
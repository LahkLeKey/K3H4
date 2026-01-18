import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheCreateManyInputObjectSchema as GeoPoiCacheCreateManyInputObjectSchema } from './objects/GeoPoiCacheCreateManyInput.schema';

export const GeoPoiCacheCreateManySchema: z.ZodType<Prisma.GeoPoiCacheCreateManyArgs> = z.object({ data: z.union([ GeoPoiCacheCreateManyInputObjectSchema, z.array(GeoPoiCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateManyArgs>;

export const GeoPoiCacheCreateManyZodSchema = z.object({ data: z.union([ GeoPoiCacheCreateManyInputObjectSchema, z.array(GeoPoiCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
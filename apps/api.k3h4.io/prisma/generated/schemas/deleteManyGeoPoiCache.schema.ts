import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './objects/GeoPoiCacheWhereInput.schema';

export const GeoPoiCacheDeleteManySchema: z.ZodType<Prisma.GeoPoiCacheDeleteManyArgs> = z.object({ where: GeoPoiCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheDeleteManyArgs>;

export const GeoPoiCacheDeleteManyZodSchema = z.object({ where: GeoPoiCacheWhereInputObjectSchema.optional() }).strict();
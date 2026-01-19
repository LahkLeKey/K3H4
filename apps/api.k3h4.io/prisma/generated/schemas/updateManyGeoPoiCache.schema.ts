import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheUpdateManyMutationInputObjectSchema as GeoPoiCacheUpdateManyMutationInputObjectSchema } from './objects/GeoPoiCacheUpdateManyMutationInput.schema';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './objects/GeoPoiCacheWhereInput.schema';

export const GeoPoiCacheUpdateManySchema: z.ZodType<Prisma.GeoPoiCacheUpdateManyArgs> = z.object({ data: GeoPoiCacheUpdateManyMutationInputObjectSchema, where: GeoPoiCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheUpdateManyArgs>;

export const GeoPoiCacheUpdateManyZodSchema = z.object({ data: GeoPoiCacheUpdateManyMutationInputObjectSchema, where: GeoPoiCacheWhereInputObjectSchema.optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './objects/GeoPoiCacheSelect.schema';
import { GeoPoiCacheUpdateManyMutationInputObjectSchema as GeoPoiCacheUpdateManyMutationInputObjectSchema } from './objects/GeoPoiCacheUpdateManyMutationInput.schema';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './objects/GeoPoiCacheWhereInput.schema';

export const GeoPoiCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoPoiCacheUpdateManyAndReturnArgs> = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), data: GeoPoiCacheUpdateManyMutationInputObjectSchema, where: GeoPoiCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheUpdateManyAndReturnArgs>;

export const GeoPoiCacheUpdateManyAndReturnZodSchema = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), data: GeoPoiCacheUpdateManyMutationInputObjectSchema, where: GeoPoiCacheWhereInputObjectSchema.optional() }).strict();
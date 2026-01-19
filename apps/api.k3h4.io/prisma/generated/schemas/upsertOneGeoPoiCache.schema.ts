import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './objects/GeoPoiCacheSelect.schema';
import { GeoPoiCacheIncludeObjectSchema as GeoPoiCacheIncludeObjectSchema } from './objects/GeoPoiCacheInclude.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './objects/GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheCreateInputObjectSchema as GeoPoiCacheCreateInputObjectSchema } from './objects/GeoPoiCacheCreateInput.schema';
import { GeoPoiCacheUncheckedCreateInputObjectSchema as GeoPoiCacheUncheckedCreateInputObjectSchema } from './objects/GeoPoiCacheUncheckedCreateInput.schema';
import { GeoPoiCacheUpdateInputObjectSchema as GeoPoiCacheUpdateInputObjectSchema } from './objects/GeoPoiCacheUpdateInput.schema';
import { GeoPoiCacheUncheckedUpdateInputObjectSchema as GeoPoiCacheUncheckedUpdateInputObjectSchema } from './objects/GeoPoiCacheUncheckedUpdateInput.schema';

export const GeoPoiCacheUpsertOneSchema: z.ZodType<Prisma.GeoPoiCacheUpsertArgs> = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), where: GeoPoiCacheWhereUniqueInputObjectSchema, create: z.union([ GeoPoiCacheCreateInputObjectSchema, GeoPoiCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoPoiCacheUpdateInputObjectSchema, GeoPoiCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheUpsertArgs>;

export const GeoPoiCacheUpsertOneZodSchema = z.object({ select: GeoPoiCacheSelectObjectSchema.optional(), include: GeoPoiCacheIncludeObjectSchema.optional(), where: GeoPoiCacheWhereUniqueInputObjectSchema, create: z.union([ GeoPoiCacheCreateInputObjectSchema, GeoPoiCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoPoiCacheUpdateInputObjectSchema, GeoPoiCacheUncheckedUpdateInputObjectSchema ]) }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './objects/GeoRouteCacheSelect.schema';
import { GeoRouteCacheIncludeObjectSchema as GeoRouteCacheIncludeObjectSchema } from './objects/GeoRouteCacheInclude.schema';
import { GeoRouteCacheUpdateInputObjectSchema as GeoRouteCacheUpdateInputObjectSchema } from './objects/GeoRouteCacheUpdateInput.schema';
import { GeoRouteCacheUncheckedUpdateInputObjectSchema as GeoRouteCacheUncheckedUpdateInputObjectSchema } from './objects/GeoRouteCacheUncheckedUpdateInput.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './objects/GeoRouteCacheWhereUniqueInput.schema';

export const GeoRouteCacheUpdateOneSchema: z.ZodType<Prisma.GeoRouteCacheUpdateArgs> = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), data: z.union([GeoRouteCacheUpdateInputObjectSchema, GeoRouteCacheUncheckedUpdateInputObjectSchema]), where: GeoRouteCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateArgs>;

export const GeoRouteCacheUpdateOneZodSchema = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), data: z.union([GeoRouteCacheUpdateInputObjectSchema, GeoRouteCacheUncheckedUpdateInputObjectSchema]), where: GeoRouteCacheWhereUniqueInputObjectSchema }).strict();
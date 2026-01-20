import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './objects/GeoQueryCacheSelect.schema';
import { GeoQueryCacheIncludeObjectSchema as GeoQueryCacheIncludeObjectSchema } from './objects/GeoQueryCacheInclude.schema';
import { GeoQueryCacheUpdateInputObjectSchema as GeoQueryCacheUpdateInputObjectSchema } from './objects/GeoQueryCacheUpdateInput.schema';
import { GeoQueryCacheUncheckedUpdateInputObjectSchema as GeoQueryCacheUncheckedUpdateInputObjectSchema } from './objects/GeoQueryCacheUncheckedUpdateInput.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './objects/GeoQueryCacheWhereUniqueInput.schema';

export const GeoQueryCacheUpdateOneSchema: z.ZodType<Prisma.GeoQueryCacheUpdateArgs> = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), data: z.union([GeoQueryCacheUpdateInputObjectSchema, GeoQueryCacheUncheckedUpdateInputObjectSchema]), where: GeoQueryCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheUpdateArgs>;

export const GeoQueryCacheUpdateOneZodSchema = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), data: z.union([GeoQueryCacheUpdateInputObjectSchema, GeoQueryCacheUncheckedUpdateInputObjectSchema]), where: GeoQueryCacheWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './objects/GeoRouteCacheSelect.schema';
import { GeoRouteCacheIncludeObjectSchema as GeoRouteCacheIncludeObjectSchema } from './objects/GeoRouteCacheInclude.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './objects/GeoRouteCacheWhereUniqueInput.schema';

export const GeoRouteCacheDeleteOneSchema: z.ZodType<Prisma.GeoRouteCacheDeleteArgs> = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), where: GeoRouteCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheDeleteArgs>;

export const GeoRouteCacheDeleteOneZodSchema = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), where: GeoRouteCacheWhereUniqueInputObjectSchema }).strict();
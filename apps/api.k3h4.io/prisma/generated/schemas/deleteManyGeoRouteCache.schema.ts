import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './objects/GeoRouteCacheWhereInput.schema';

export const GeoRouteCacheDeleteManySchema: z.ZodType<Prisma.GeoRouteCacheDeleteManyArgs> = z.object({ where: GeoRouteCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheDeleteManyArgs>;

export const GeoRouteCacheDeleteManyZodSchema = z.object({ where: GeoRouteCacheWhereInputObjectSchema.optional() }).strict();
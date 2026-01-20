import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './objects/GeoQueryCacheWhereInput.schema';

export const GeoQueryCacheDeleteManySchema: z.ZodType<Prisma.GeoQueryCacheDeleteManyArgs> = z.object({ where: GeoQueryCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheDeleteManyArgs>;

export const GeoQueryCacheDeleteManyZodSchema = z.object({ where: GeoQueryCacheWhereInputObjectSchema.optional() }).strict();
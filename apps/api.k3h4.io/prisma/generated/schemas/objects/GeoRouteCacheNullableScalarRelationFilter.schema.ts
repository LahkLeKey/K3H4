import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './GeoRouteCacheWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional().nullable()
}).strict();
export const GeoRouteCacheNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.GeoRouteCacheNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheNullableScalarRelationFilter>;
export const GeoRouteCacheNullableScalarRelationFilterObjectZodSchema = makeSchema();

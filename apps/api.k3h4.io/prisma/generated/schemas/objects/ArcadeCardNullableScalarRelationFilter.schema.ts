import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional().nullable()
}).strict();
export const ArcadeCardNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeCardNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardNullableScalarRelationFilter>;
export const ArcadeCardNullableScalarRelationFilterObjectZodSchema = makeSchema();

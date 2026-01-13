import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardScalarRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeCardScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardScalarRelationFilter>;
export const ArcadeCardScalarRelationFilterObjectZodSchema = makeSchema();

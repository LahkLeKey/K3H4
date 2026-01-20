import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './BuildingWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => BuildingWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => BuildingWhereInputObjectSchema).optional().nullable()
}).strict();
export const BuildingNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.BuildingNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BuildingNullableScalarRelationFilter>;
export const BuildingNullableScalarRelationFilterObjectZodSchema = makeSchema();

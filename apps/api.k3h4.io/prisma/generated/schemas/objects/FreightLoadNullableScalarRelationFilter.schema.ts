import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => FreightLoadWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => FreightLoadWhereInputObjectSchema).optional().nullable()
}).strict();
export const FreightLoadNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.FreightLoadNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadNullableScalarRelationFilter>;
export const FreightLoadNullableScalarRelationFilterObjectZodSchema = makeSchema();

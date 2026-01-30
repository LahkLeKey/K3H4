import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional().nullable()
}).strict();
export const MaptilerQueryNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.MaptilerQueryNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryNullableScalarRelationFilter>;
export const MaptilerQueryNullableScalarRelationFilterObjectZodSchema = makeSchema();

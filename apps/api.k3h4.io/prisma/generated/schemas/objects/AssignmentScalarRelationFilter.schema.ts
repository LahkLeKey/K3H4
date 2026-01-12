import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AssignmentWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => AssignmentWhereInputObjectSchema).optional()
}).strict();
export const AssignmentScalarRelationFilterObjectSchema: z.ZodType<Prisma.AssignmentScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentScalarRelationFilter>;
export const AssignmentScalarRelationFilterObjectZodSchema = makeSchema();

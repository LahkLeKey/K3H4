import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './ArcadeMachineWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional()
}).strict();
export const ArcadeMachineScalarRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeMachineScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineScalarRelationFilter>;
export const ArcadeMachineScalarRelationFilterObjectZodSchema = makeSchema();

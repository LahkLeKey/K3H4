import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAssignmentsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAssignmentsArgsObjectZodSchema = makeSchema();

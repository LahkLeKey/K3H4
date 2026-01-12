import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardWhereInputObjectSchema as AssignmentTimecardWhereInputObjectSchema } from './AssignmentTimecardWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentTimecardWhereInputObjectSchema).optional()
}).strict();
export const AssignmentCountOutputTypeCountTimecardsArgsObjectSchema = makeSchema();
export const AssignmentCountOutputTypeCountTimecardsArgsObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereInputObjectSchema as AssignmentPayoutWhereInputObjectSchema } from './AssignmentPayoutWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereInputObjectSchema).optional()
}).strict();
export const AssignmentCountOutputTypeCountPayoutsArgsObjectSchema = makeSchema();
export const AssignmentCountOutputTypeCountPayoutsArgsObjectZodSchema = makeSchema();

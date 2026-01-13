import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCountOutputTypeCountTimecardsArgsObjectSchema as AssignmentCountOutputTypeCountTimecardsArgsObjectSchema } from './AssignmentCountOutputTypeCountTimecardsArgs.schema';
import { AssignmentCountOutputTypeCountPayoutsArgsObjectSchema as AssignmentCountOutputTypeCountPayoutsArgsObjectSchema } from './AssignmentCountOutputTypeCountPayoutsArgs.schema'

const makeSchema = () => z.object({
  timecards: z.union([z.boolean(), z.lazy(() => AssignmentCountOutputTypeCountTimecardsArgsObjectSchema)]).optional(),
  payouts: z.union([z.boolean(), z.lazy(() => AssignmentCountOutputTypeCountPayoutsArgsObjectSchema)]).optional()
}).strict();
export const AssignmentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AssignmentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCountOutputTypeSelect>;
export const AssignmentCountOutputTypeSelectObjectZodSchema = makeSchema();

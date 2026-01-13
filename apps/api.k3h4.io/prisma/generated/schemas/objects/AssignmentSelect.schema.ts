import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema';
import { AssignmentTimecardFindManySchema as AssignmentTimecardFindManySchema } from '../findManyAssignmentTimecard.schema';
import { AssignmentPayoutFindManySchema as AssignmentPayoutFindManySchema } from '../findManyAssignmentPayout.schema';
import { AssignmentCountOutputTypeArgsObjectSchema as AssignmentCountOutputTypeArgsObjectSchema } from './AssignmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  personaId: z.boolean().optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  hourlyRate: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  timecards: z.union([z.boolean(), z.lazy(() => AssignmentTimecardFindManySchema)]).optional(),
  payouts: z.union([z.boolean(), z.lazy(() => AssignmentPayoutFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AssignmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AssignmentSelectObjectSchema: z.ZodType<Prisma.AssignmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentSelect>;
export const AssignmentSelectObjectZodSchema = makeSchema();

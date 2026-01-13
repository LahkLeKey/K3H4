import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema';
import { AssignmentTimecardFindManySchema as AssignmentTimecardFindManySchema } from '../findManyAssignmentTimecard.schema';
import { AssignmentPayoutFindManySchema as AssignmentPayoutFindManySchema } from '../findManyAssignmentPayout.schema';
import { AssignmentCountOutputTypeArgsObjectSchema as AssignmentCountOutputTypeArgsObjectSchema } from './AssignmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  timecards: z.union([z.boolean(), z.lazy(() => AssignmentTimecardFindManySchema)]).optional(),
  payouts: z.union([z.boolean(), z.lazy(() => AssignmentPayoutFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AssignmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AssignmentIncludeObjectSchema: z.ZodType<Prisma.AssignmentInclude> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentInclude>;
export const AssignmentIncludeObjectZodSchema = makeSchema();

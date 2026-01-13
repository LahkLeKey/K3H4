import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AssignmentFindManySchema as AssignmentFindManySchema } from '../findManyAssignment.schema';
import { AssignmentPayoutFindManySchema as AssignmentPayoutFindManySchema } from '../findManyAssignmentPayout.schema';
import { PersonaAttributeFindManySchema as PersonaAttributeFindManySchema } from '../findManyPersonaAttribute.schema';
import { PersonaCompatibilityFindManySchema as PersonaCompatibilityFindManySchema } from '../findManyPersonaCompatibility.schema';
import { PersonaCountOutputTypeArgsObjectSchema as PersonaCountOutputTypeArgsObjectSchema } from './PersonaCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  assignments: z.union([z.boolean(), z.lazy(() => AssignmentFindManySchema)]).optional(),
  assignmentPayouts: z.union([z.boolean(), z.lazy(() => AssignmentPayoutFindManySchema)]).optional(),
  attributes: z.union([z.boolean(), z.lazy(() => PersonaAttributeFindManySchema)]).optional(),
  compatibilitySources: z.union([z.boolean(), z.lazy(() => PersonaCompatibilityFindManySchema)]).optional(),
  compatibilityTargets: z.union([z.boolean(), z.lazy(() => PersonaCompatibilityFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PersonaIncludeObjectSchema: z.ZodType<Prisma.PersonaInclude> = makeSchema() as unknown as z.ZodType<Prisma.PersonaInclude>;
export const PersonaIncludeObjectZodSchema = makeSchema();

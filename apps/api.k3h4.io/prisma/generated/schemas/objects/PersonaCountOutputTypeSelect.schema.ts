import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCountOutputTypeCountAssignmentsArgsObjectSchema as PersonaCountOutputTypeCountAssignmentsArgsObjectSchema } from './PersonaCountOutputTypeCountAssignmentsArgs.schema';
import { PersonaCountOutputTypeCountAssignmentPayoutsArgsObjectSchema as PersonaCountOutputTypeCountAssignmentPayoutsArgsObjectSchema } from './PersonaCountOutputTypeCountAssignmentPayoutsArgs.schema';
import { PersonaCountOutputTypeCountAttributesArgsObjectSchema as PersonaCountOutputTypeCountAttributesArgsObjectSchema } from './PersonaCountOutputTypeCountAttributesArgs.schema';
import { PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema as PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema } from './PersonaCountOutputTypeCountCompatibilitySourcesArgs.schema';
import { PersonaCountOutputTypeCountCompatibilityTargetsArgsObjectSchema as PersonaCountOutputTypeCountCompatibilityTargetsArgsObjectSchema } from './PersonaCountOutputTypeCountCompatibilityTargetsArgs.schema'

const makeSchema = () => z.object({
  assignments: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountAssignmentsArgsObjectSchema)]).optional(),
  assignmentPayouts: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountAssignmentPayoutsArgsObjectSchema)]).optional(),
  attributes: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountAttributesArgsObjectSchema)]).optional(),
  compatibilitySources: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema)]).optional(),
  compatibilityTargets: z.union([z.boolean(), z.lazy(() => PersonaCountOutputTypeCountCompatibilityTargetsArgsObjectSchema)]).optional()
}).strict();
export const PersonaCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PersonaCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCountOutputTypeSelect>;
export const PersonaCountOutputTypeSelectObjectZodSchema = makeSchema();

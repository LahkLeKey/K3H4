import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutPersonasInputObjectSchema as UserCreateNestedOneWithoutPersonasInputObjectSchema } from './UserCreateNestedOneWithoutPersonasInput.schema';
import { AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateNestedManyWithoutPersonaInput.schema';
import { StaffingCandidateCreateNestedManyWithoutPersonaInputObjectSchema as StaffingCandidateCreateNestedManyWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateNestedManyWithoutPersonaInput.schema';
import { StaffingShiftCreateNestedManyWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateNestedManyWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateNestedManyWithoutAssignedPersonaInput.schema';
import { StaffingPlacementCreateNestedManyWithoutPersonaInputObjectSchema as StaffingPlacementCreateNestedManyWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateNestedManyWithoutPersonaInput.schema';
import { PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema as PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema } from './PersonaAttributeCreateNestedManyWithoutPersonaInput.schema';
import { PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema as PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema } from './PersonaCompatibilityCreateNestedManyWithoutSourceInput.schema';
import { PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema as PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema } from './PersonaCompatibilityCreateNestedManyWithoutTargetInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  alias: z.string(),
  account: z.string(),
  handle: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPersonasInputObjectSchema),
  assignmentPayouts: z.lazy(() => AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  staffingShiftsAssigned: z.lazy(() => StaffingShiftCreateNestedManyWithoutAssignedPersonaInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema).optional()
}).strict();
export const PersonaCreateWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.PersonaCreateWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateWithoutAssignmentsInput>;
export const PersonaCreateWithoutAssignmentsInputObjectZodSchema = makeSchema();

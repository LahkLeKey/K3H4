import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutPersonasInputObjectSchema as UserCreateNestedOneWithoutPersonasInputObjectSchema } from './UserCreateNestedOneWithoutPersonasInput.schema';
import { AssignmentCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentCreateNestedManyWithoutPersonaInput.schema';
import { AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateNestedManyWithoutPersonaInput.schema';
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
  assignments: z.lazy(() => AssignmentCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  staffingShiftsAssigned: z.lazy(() => StaffingShiftCreateNestedManyWithoutAssignedPersonaInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutSourceInputObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutTargetInputObjectSchema).optional()
}).strict();
export const PersonaCreateWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.PersonaCreateWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateWithoutStaffingCandidatesInput>;
export const PersonaCreateWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();

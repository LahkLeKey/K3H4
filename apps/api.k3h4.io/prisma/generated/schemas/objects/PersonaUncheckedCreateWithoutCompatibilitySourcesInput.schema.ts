import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { AssignmentUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInput.schema';
import { StaffingPlacementUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema as PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema } from './PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInput.schema';
import { PersonaCompatibilityUncheckedCreateNestedManyWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedCreateNestedManyWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedCreateNestedManyWithoutTargetInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  alias: z.string(),
  account: z.string(),
  handle: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assignments: z.lazy(() => AssignmentUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  staffingShiftsAssigned: z.lazy(() => StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeUncheckedCreateNestedManyWithoutPersonaInputObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityUncheckedCreateNestedManyWithoutTargetInputObjectSchema).optional()
}).strict();
export const PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectSchema: z.ZodType<Prisma.PersonaUncheckedCreateWithoutCompatibilitySourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUncheckedCreateWithoutCompatibilitySourcesInput>;
export const PersonaUncheckedCreateWithoutCompatibilitySourcesInputObjectZodSchema = makeSchema();

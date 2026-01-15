import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AssignmentUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema as AssignmentUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema } from './AssignmentUncheckedUpdateManyWithoutPersonaNestedInput.schema';
import { AssignmentPayoutUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema as AssignmentPayoutUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema } from './AssignmentPayoutUncheckedUpdateManyWithoutPersonaNestedInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInput.schema';
import { PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema as PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema } from './PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInput.schema';
import { PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInputObjectSchema as PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInput.schema';
import { PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInputObjectSchema as PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  alias: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  account: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  handle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  assignments: z.lazy(() => AssignmentUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  staffingShiftsAssigned: z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityUncheckedUpdateManyWithoutSourceNestedInputObjectSchema).optional(),
  compatibilityTargets: z.lazy(() => PersonaCompatibilityUncheckedUpdateManyWithoutTargetNestedInputObjectSchema).optional()
}).strict();
export const PersonaUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.PersonaUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUncheckedUpdateInput>;
export const PersonaUncheckedUpdateInputObjectZodSchema = makeSchema();

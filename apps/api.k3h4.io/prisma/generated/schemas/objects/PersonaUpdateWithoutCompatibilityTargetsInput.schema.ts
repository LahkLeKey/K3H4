import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutPersonasNestedInputObjectSchema as UserUpdateOneRequiredWithoutPersonasNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutPersonasNestedInput.schema';
import { AssignmentUpdateManyWithoutPersonaNestedInputObjectSchema as AssignmentUpdateManyWithoutPersonaNestedInputObjectSchema } from './AssignmentUpdateManyWithoutPersonaNestedInput.schema';
import { AssignmentPayoutUpdateManyWithoutPersonaNestedInputObjectSchema as AssignmentPayoutUpdateManyWithoutPersonaNestedInputObjectSchema } from './AssignmentPayoutUpdateManyWithoutPersonaNestedInput.schema';
import { StaffingCandidateUpdateManyWithoutPersonaNestedInputObjectSchema as StaffingCandidateUpdateManyWithoutPersonaNestedInputObjectSchema } from './StaffingCandidateUpdateManyWithoutPersonaNestedInput.schema';
import { StaffingShiftUpdateManyWithoutAssignedPersonaNestedInputObjectSchema as StaffingShiftUpdateManyWithoutAssignedPersonaNestedInputObjectSchema } from './StaffingShiftUpdateManyWithoutAssignedPersonaNestedInput.schema';
import { StaffingPlacementUpdateManyWithoutPersonaNestedInputObjectSchema as StaffingPlacementUpdateManyWithoutPersonaNestedInputObjectSchema } from './StaffingPlacementUpdateManyWithoutPersonaNestedInput.schema';
import { PersonaAttributeUpdateManyWithoutPersonaNestedInputObjectSchema as PersonaAttributeUpdateManyWithoutPersonaNestedInputObjectSchema } from './PersonaAttributeUpdateManyWithoutPersonaNestedInput.schema';
import { PersonaCompatibilityUpdateManyWithoutSourceNestedInputObjectSchema as PersonaCompatibilityUpdateManyWithoutSourceNestedInputObjectSchema } from './PersonaCompatibilityUpdateManyWithoutSourceNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  alias: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  account: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  handle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPersonasNestedInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  assignmentPayouts: z.lazy(() => AssignmentPayoutUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  staffingShiftsAssigned: z.lazy(() => StaffingShiftUpdateManyWithoutAssignedPersonaNestedInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  attributes: z.lazy(() => PersonaAttributeUpdateManyWithoutPersonaNestedInputObjectSchema).optional(),
  compatibilitySources: z.lazy(() => PersonaCompatibilityUpdateManyWithoutSourceNestedInputObjectSchema).optional()
}).strict();
export const PersonaUpdateWithoutCompatibilityTargetsInputObjectSchema: z.ZodType<Prisma.PersonaUpdateWithoutCompatibilityTargetsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateWithoutCompatibilityTargetsInput>;
export const PersonaUpdateWithoutCompatibilityTargetsInputObjectZodSchema = makeSchema();

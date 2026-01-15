import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutStaffingCandidatesNestedInputObjectSchema as UserUpdateOneRequiredWithoutStaffingCandidatesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutStaffingCandidatesNestedInput.schema';
import { StaffingEngagementUpdateOneWithoutCandidatesNestedInputObjectSchema as StaffingEngagementUpdateOneWithoutCandidatesNestedInputObjectSchema } from './StaffingEngagementUpdateOneWithoutCandidatesNestedInput.schema';
import { StaffingRoleUpdateOneWithoutCandidatesNestedInputObjectSchema as StaffingRoleUpdateOneWithoutCandidatesNestedInputObjectSchema } from './StaffingRoleUpdateOneWithoutCandidatesNestedInput.schema';
import { PersonaUpdateOneWithoutStaffingCandidatesNestedInputObjectSchema as PersonaUpdateOneWithoutStaffingCandidatesNestedInputObjectSchema } from './PersonaUpdateOneWithoutStaffingCandidatesNestedInput.schema';
import { StaffingPlacementUpdateManyWithoutCandidateNestedInputObjectSchema as StaffingPlacementUpdateManyWithoutCandidateNestedInputObjectSchema } from './StaffingPlacementUpdateManyWithoutCandidateNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  stage: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  score: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'score' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  desiredRate: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'desiredRate' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  availability: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStaffingCandidatesNestedInputObjectSchema).optional(),
  engagement: z.lazy(() => StaffingEngagementUpdateOneWithoutCandidatesNestedInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleUpdateOneWithoutCandidatesNestedInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaUpdateOneWithoutStaffingCandidatesNestedInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementUpdateManyWithoutCandidateNestedInputObjectSchema).optional()
}).strict();
export const StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateWithoutShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateWithoutShiftsAssignedInput>;
export const StaffingCandidateUpdateWithoutShiftsAssignedInputObjectZodSchema = makeSchema();

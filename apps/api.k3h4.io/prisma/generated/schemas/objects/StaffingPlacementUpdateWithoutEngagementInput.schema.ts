import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutStaffingPlacementsNestedInputObjectSchema as UserUpdateOneRequiredWithoutStaffingPlacementsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutStaffingPlacementsNestedInput.schema';
import { StaffingRoleUpdateOneWithoutPlacementsNestedInputObjectSchema as StaffingRoleUpdateOneWithoutPlacementsNestedInputObjectSchema } from './StaffingRoleUpdateOneWithoutPlacementsNestedInput.schema';
import { StaffingCandidateUpdateOneWithoutPlacementsNestedInputObjectSchema as StaffingCandidateUpdateOneWithoutPlacementsNestedInputObjectSchema } from './StaffingCandidateUpdateOneWithoutPlacementsNestedInput.schema';
import { PersonaUpdateOneWithoutStaffingPlacementsNestedInputObjectSchema as PersonaUpdateOneWithoutStaffingPlacementsNestedInputObjectSchema } from './PersonaUpdateOneWithoutStaffingPlacementsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  startDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  billRate: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'billRate' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  payRate: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'payRate' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  margin: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'margin' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStaffingPlacementsNestedInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleUpdateOneWithoutPlacementsNestedInputObjectSchema).optional(),
  candidate: z.lazy(() => StaffingCandidateUpdateOneWithoutPlacementsNestedInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaUpdateOneWithoutStaffingPlacementsNestedInputObjectSchema).optional()
}).strict();
export const StaffingPlacementUpdateWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateWithoutEngagementInput>;
export const StaffingPlacementUpdateWithoutEngagementInputObjectZodSchema = makeSchema();

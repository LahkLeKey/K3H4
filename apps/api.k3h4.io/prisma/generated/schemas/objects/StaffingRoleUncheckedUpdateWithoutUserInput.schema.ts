import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema as EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema } from './EnumEngagementPriorityFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutRoleNestedInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutRoleNestedInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutRoleNestedInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutRoleNestedInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutRoleNestedInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutRoleNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  engagementId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  modality: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  openings: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  filled: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  priority: z.union([EngagementPrioritySchema, z.lazy(() => EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  rateMin: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'rateMin' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  rateMax: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'rateMax' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
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
  tags: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  skills: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  candidates: z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInputObjectSchema).optional(),
  shifts: z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutRoleNestedInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutRoleNestedInputObjectSchema).optional()
}).strict();
export const StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingRoleUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUncheckedUpdateWithoutUserInput>;
export const StaffingRoleUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();

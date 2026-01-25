import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema as EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema } from './EnumEngagementPriorityFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StaffingRoleUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema as StaffingRoleUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema } from './StaffingRoleUncheckedUpdateManyWithoutEngagementNestedInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutEngagementNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  client: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  priority: z.union([EngagementPrioritySchema, z.lazy(() => EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  startDate: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  endDate: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  budget: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'budget' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  forecast: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'forecast' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  roles: z.lazy(() => StaffingRoleUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema).optional(),
  candidates: z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema).optional(),
  placements: z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema).optional()
}).strict();
export const StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUncheckedUpdateWithoutUserInput>;
export const StaffingEngagementUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();

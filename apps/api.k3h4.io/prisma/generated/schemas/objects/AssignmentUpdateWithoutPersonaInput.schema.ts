import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAssignmentsNestedInput.schema';
import { AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema as AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema } from './AssignmentTimecardUpdateManyWithoutAssignmentNestedInput.schema';
import { AssignmentPayoutUpdateManyWithoutAssignmentNestedInputObjectSchema as AssignmentPayoutUpdateManyWithoutAssignmentNestedInputObjectSchema } from './AssignmentPayoutUpdateManyWithoutAssignmentNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  hourlyRate: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourlyRate' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema).optional(),
  timecards: z.lazy(() => AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema).optional(),
  payouts: z.lazy(() => AssignmentPayoutUpdateManyWithoutAssignmentNestedInputObjectSchema).optional()
}).strict();
export const AssignmentUpdateWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateWithoutPersonaInput>;
export const AssignmentUpdateWithoutPersonaInputObjectZodSchema = makeSchema();

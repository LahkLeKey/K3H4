import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAssignmentsNestedInput.schema';
import { PersonaUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema as PersonaUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema } from './PersonaUpdateOneRequiredWithoutAssignmentsNestedInput.schema';
import { AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema as AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema } from './AssignmentTimecardUpdateManyWithoutAssignmentNestedInput.schema'

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
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaUpdateOneRequiredWithoutAssignmentsNestedInputObjectSchema).optional(),
  timecards: z.lazy(() => AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema).optional()
}).strict();
export const AssignmentUpdateWithoutPayoutsInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateWithoutPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateWithoutPayoutsInput>;
export const AssignmentUpdateWithoutPayoutsInputObjectZodSchema = makeSchema();

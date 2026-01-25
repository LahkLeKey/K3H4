import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInputObjectSchema as ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInputObjectSchema } from './ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutCardNestedInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutCardNestedInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutCardNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  label: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  balance: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balance' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  topUps: z.lazy(() => ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutCardNestedInputObjectSchema).optional()
}).strict();
export const ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUncheckedUpdateWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUncheckedUpdateWithoutRedemptionsInput>;
export const ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectZodSchema = makeSchema();

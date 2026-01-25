import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutArcadeCardsNestedInputObjectSchema as UserUpdateOneRequiredWithoutArcadeCardsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutArcadeCardsNestedInput.schema';
import { ArcadeTopUpUpdateManyWithoutCardNestedInputObjectSchema as ArcadeTopUpUpdateManyWithoutCardNestedInputObjectSchema } from './ArcadeTopUpUpdateManyWithoutCardNestedInput.schema';
import { ArcadeSessionUpdateManyWithoutCardNestedInputObjectSchema as ArcadeSessionUpdateManyWithoutCardNestedInputObjectSchema } from './ArcadeSessionUpdateManyWithoutCardNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
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
  user: z.lazy(() => UserUpdateOneRequiredWithoutArcadeCardsNestedInputObjectSchema).optional(),
  topUps: z.lazy(() => ArcadeTopUpUpdateManyWithoutCardNestedInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionUpdateManyWithoutCardNestedInputObjectSchema).optional()
}).strict();
export const ArcadeCardUpdateWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateWithoutRedemptionsInput>;
export const ArcadeCardUpdateWithoutRedemptionsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutArcadeSessionsNestedInputObjectSchema as UserUpdateOneRequiredWithoutArcadeSessionsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutArcadeSessionsNestedInput.schema';
import { ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInputObjectSchema as ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInputObjectSchema } from './ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInput.schema';
import { ArcadeCardUpdateOneRequiredWithoutSessionsNestedInputObjectSchema as ArcadeCardUpdateOneRequiredWithoutSessionsNestedInputObjectSchema } from './ArcadeCardUpdateOneRequiredWithoutSessionsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  creditsSpent: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditsSpent' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  startedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  endedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutArcadeSessionsNestedInputObjectSchema).optional(),
  machine: z.lazy(() => ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInputObjectSchema).optional(),
  card: z.lazy(() => ArcadeCardUpdateOneRequiredWithoutSessionsNestedInputObjectSchema).optional()
}).strict();
export const ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateWithoutRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateWithoutRewardRedemptionInput>;
export const ArcadeSessionUpdateWithoutRewardRedemptionInputObjectZodSchema = makeSchema();

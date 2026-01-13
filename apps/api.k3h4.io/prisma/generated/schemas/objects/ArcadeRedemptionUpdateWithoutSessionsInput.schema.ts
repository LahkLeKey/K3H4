import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema as UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInput.schema';
import { ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema as ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema } from './ArcadeCardUpdateOneWithoutRedemptionsNestedInput.schema';
import { ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema as ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema } from './ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fulfilledAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema).optional(),
  card: z.lazy(() => ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema).optional(),
  prize: z.lazy(() => ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateWithoutSessionsInput>;
export const ArcadeRedemptionUpdateWithoutSessionsInputObjectZodSchema = makeSchema();

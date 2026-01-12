import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionNestedInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionNestedInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  prizeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fulfilledAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionNestedInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedUpdateWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedUpdateWithoutCardInput>;
export const ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectZodSchema = makeSchema();

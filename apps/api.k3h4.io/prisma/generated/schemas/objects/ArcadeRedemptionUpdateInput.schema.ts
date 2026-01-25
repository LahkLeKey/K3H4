import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema as UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInput.schema';
import { ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema as ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema } from './ArcadeCardUpdateOneWithoutRedemptionsNestedInput.schema';
import { ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema as ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema } from './ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInput.schema';
import { ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInputObjectSchema as ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInputObjectSchema } from './ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  fulfilledAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema).optional(),
  card: z.lazy(() => ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema).optional(),
  prize: z.lazy(() => ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUpdateInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateInput>;
export const ArcadeRedemptionUpdateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  gameTitle: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInputObjectSchema).optional()
}).strict();
export const ArcadeMachineUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUncheckedUpdateInput>;
export const ArcadeMachineUncheckedUpdateInputObjectZodSchema = makeSchema();

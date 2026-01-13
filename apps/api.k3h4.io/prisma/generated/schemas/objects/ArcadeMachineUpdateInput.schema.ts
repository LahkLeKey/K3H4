import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutArcadeMachinesNestedInputObjectSchema as UserUpdateOneRequiredWithoutArcadeMachinesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutArcadeMachinesNestedInput.schema';
import { ArcadeSessionUpdateManyWithoutMachineNestedInputObjectSchema as ArcadeSessionUpdateManyWithoutMachineNestedInputObjectSchema } from './ArcadeSessionUpdateManyWithoutMachineNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  gameTitle: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutArcadeMachinesNestedInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionUpdateManyWithoutMachineNestedInputObjectSchema).optional()
}).strict();
export const ArcadeMachineUpdateInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateInput>;
export const ArcadeMachineUpdateInputObjectZodSchema = makeSchema();

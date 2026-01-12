import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutPosStoresNestedInputObjectSchema as UserUpdateOneRequiredWithoutPosStoresNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutPosStoresNestedInput.schema';
import { PosTicketUpdateManyWithoutStoreNestedInputObjectSchema as PosTicketUpdateManyWithoutStoreNestedInputObjectSchema } from './PosTicketUpdateManyWithoutStoreNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  channel: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPosStoresNestedInputObjectSchema).optional(),
  tickets: z.lazy(() => PosTicketUpdateManyWithoutStoreNestedInputObjectSchema).optional()
}).strict();
export const PosStoreUpdateInputObjectSchema: z.ZodType<Prisma.PosStoreUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpdateInput>;
export const PosStoreUpdateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PosTicketUncheckedUpdateManyWithoutStoreNestedInputObjectSchema as PosTicketUncheckedUpdateManyWithoutStoreNestedInputObjectSchema } from './PosTicketUncheckedUpdateManyWithoutStoreNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  channel: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  tickets: z.lazy(() => PosTicketUncheckedUpdateManyWithoutStoreNestedInputObjectSchema).optional()
}).strict();
export const PosStoreUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.PosStoreUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUncheckedUpdateInput>;
export const PosStoreUncheckedUpdateInputObjectZodSchema = makeSchema();

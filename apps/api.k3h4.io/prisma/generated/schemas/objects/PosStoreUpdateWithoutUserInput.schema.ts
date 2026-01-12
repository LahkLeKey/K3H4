import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PosTicketUpdateManyWithoutStoreNestedInputObjectSchema as PosTicketUpdateManyWithoutStoreNestedInputObjectSchema } from './PosTicketUpdateManyWithoutStoreNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  channel: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  tickets: z.lazy(() => PosTicketUpdateManyWithoutStoreNestedInputObjectSchema).optional()
}).strict();
export const PosStoreUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpdateWithoutUserInput>;
export const PosStoreUpdateWithoutUserInputObjectZodSchema = makeSchema();

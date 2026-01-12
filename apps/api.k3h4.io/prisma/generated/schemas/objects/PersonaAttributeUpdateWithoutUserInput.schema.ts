import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PersonaUpdateOneRequiredWithoutAttributesNestedInputObjectSchema as PersonaUpdateOneRequiredWithoutAttributesNestedInputObjectSchema } from './PersonaUpdateOneRequiredWithoutAttributesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  category: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  weight: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  persona: z.lazy(() => PersonaUpdateOneRequiredWithoutAttributesNestedInputObjectSchema).optional()
}).strict();
export const PersonaAttributeUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateWithoutUserInput>;
export const PersonaAttributeUpdateWithoutUserInputObjectZodSchema = makeSchema();

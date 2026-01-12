import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { AgricultureResourceUpdatetagsInputObjectSchema as AgricultureResourceUpdatetagsInputObjectSchema } from './AgricultureResourceUpdatetagsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInputObjectSchema as AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInputObjectSchema } from './AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  summary: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  tags: z.union([z.lazy(() => AgricultureResourceUpdatetagsInputObjectSchema), z.string().array()]).optional(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  category: z.lazy(() => AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInputObjectSchema).optional()
}).strict();
export const AgricultureResourceUpdateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUpdateInput>;
export const AgricultureResourceUpdateInputObjectZodSchema = makeSchema();

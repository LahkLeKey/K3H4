import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema as AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema } from './AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  resources: z.lazy(() => AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUncheckedUpdateInput>;
export const AgricultureResourceCategoryUncheckedUpdateInputObjectZodSchema = makeSchema();

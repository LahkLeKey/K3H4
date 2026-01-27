import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema'

const makeSchema = () => z.object({
  set: WarehouseCategorySchema.optional()
}).strict();
export const EnumWarehouseCategoryFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumWarehouseCategoryFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumWarehouseCategoryFieldUpdateOperationsInput>;
export const EnumWarehouseCategoryFieldUpdateOperationsInputObjectZodSchema = makeSchema();

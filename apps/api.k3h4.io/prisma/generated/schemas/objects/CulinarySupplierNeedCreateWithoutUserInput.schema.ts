import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  item: z.string(),
  quantity: z.string(),
  status: LifecycleStatusSchema.optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CulinarySupplierNeedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateWithoutUserInput>;
export const CulinarySupplierNeedCreateWithoutUserInputObjectZodSchema = makeSchema();

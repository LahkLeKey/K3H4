import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  item: z.string(),
  quantity: z.string(),
  status: LifecycleStatusSchema.optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CulinarySupplierNeedUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUncheckedCreateInput>;
export const CulinarySupplierNeedUncheckedCreateInputObjectZodSchema = makeSchema();

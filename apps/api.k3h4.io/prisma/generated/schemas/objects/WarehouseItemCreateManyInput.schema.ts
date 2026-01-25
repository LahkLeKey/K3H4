import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  quantity: z.number().int().optional(),
  location: z.string(),
  status: LifecycleStatusSchema.optional(),
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WarehouseItemCreateManyInputObjectSchema: z.ZodType<Prisma.WarehouseItemCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateManyInput>;
export const WarehouseItemCreateManyInputObjectZodSchema = makeSchema();

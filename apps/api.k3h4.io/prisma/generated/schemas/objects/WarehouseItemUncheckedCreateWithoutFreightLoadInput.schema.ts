import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  quantity: z.number().int().optional(),
  location: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.WarehouseItemUncheckedCreateWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUncheckedCreateWithoutFreightLoadInput>;
export const WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectZodSchema = makeSchema();

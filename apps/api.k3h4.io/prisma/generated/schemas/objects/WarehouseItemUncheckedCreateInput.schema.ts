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
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const WarehouseItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.WarehouseItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUncheckedCreateInput>;
export const WarehouseItemUncheckedCreateInputObjectZodSchema = makeSchema();

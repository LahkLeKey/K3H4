import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  quantity: z.number().int().optional(),
  location: z.string(),
  status: z.string().optional(),
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WarehouseItemUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUncheckedCreateWithoutUserInput>;
export const WarehouseItemUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

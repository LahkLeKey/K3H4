import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateNestedOneWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  quantity: z.number().int().optional(),
  location: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  freightLoad: z.lazy(() => FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema).optional()
}).strict();
export const WarehouseItemCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateWithoutUserInput>;
export const WarehouseItemCreateWithoutUserInputObjectZodSchema = makeSchema();

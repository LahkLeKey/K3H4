import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutWarehouseItemsInputObjectSchema as UserCreateNestedOneWithoutWarehouseItemsInputObjectSchema } from './UserCreateNestedOneWithoutWarehouseItemsInput.schema';
import { FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateNestedOneWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  quantity: z.number().int().optional(),
  location: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWarehouseItemsInputObjectSchema),
  freightLoad: z.lazy(() => FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema).optional()
}).strict();
export const WarehouseItemCreateInputObjectSchema: z.ZodType<Prisma.WarehouseItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateInput>;
export const WarehouseItemCreateInputObjectZodSchema = makeSchema();

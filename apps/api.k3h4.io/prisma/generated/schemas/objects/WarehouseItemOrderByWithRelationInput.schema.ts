import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { FreightLoadOrderByWithRelationInputObjectSchema as FreightLoadOrderByWithRelationInputObjectSchema } from './FreightLoadOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quantity: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  freightLoadId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  freightLoad: z.lazy(() => FreightLoadOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const WarehouseItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.WarehouseItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemOrderByWithRelationInput>;
export const WarehouseItemOrderByWithRelationInputObjectZodSchema = makeSchema();

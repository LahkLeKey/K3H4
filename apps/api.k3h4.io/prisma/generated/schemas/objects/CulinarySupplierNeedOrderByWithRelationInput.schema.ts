import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  item: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  dueDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CulinarySupplierNeedOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedOrderByWithRelationInput>;
export const CulinarySupplierNeedOrderByWithRelationInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema as AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema } from './AgricultureInventoryMovementOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  totalQuantity: SortOrderSchema.optional(),
  unit: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  movements: z.lazy(() => AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryOrderByWithRelationInput>;
export const AgricultureInventoryOrderByWithRelationInputObjectZodSchema = makeSchema();

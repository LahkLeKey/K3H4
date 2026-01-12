import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgricultureInventoryOrderByWithRelationInputObjectSchema as AgricultureInventoryOrderByWithRelationInputObjectSchema } from './AgricultureInventoryOrderByWithRelationInput.schema';
import { AgricultureShipmentOrderByWithRelationInputObjectSchema as AgricultureShipmentOrderByWithRelationInputObjectSchema } from './AgricultureShipmentOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  inventoryId: SortOrderSchema.optional(),
  shipmentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  inventory: z.lazy(() => AgricultureInventoryOrderByWithRelationInputObjectSchema).optional(),
  shipment: z.lazy(() => AgricultureShipmentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementOrderByWithRelationInput>;
export const AgricultureInventoryMovementOrderByWithRelationInputObjectZodSchema = makeSchema();

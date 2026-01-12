import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { FreightLoadOrderByWithRelationInputObjectSchema as FreightLoadOrderByWithRelationInputObjectSchema } from './FreightLoadOrderByWithRelationInput.schema';
import { AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema as AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema } from './AgricultureInventoryMovementOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  lot: SortOrderSchema.optional(),
  destination: SortOrderSchema.optional(),
  mode: SortOrderSchema.optional(),
  eta: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  freightLoadId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  freightLoad: z.lazy(() => FreightLoadOrderByWithRelationInputObjectSchema).optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentOrderByWithRelationInput>;
export const AgricultureShipmentOrderByWithRelationInputObjectZodSchema = makeSchema();

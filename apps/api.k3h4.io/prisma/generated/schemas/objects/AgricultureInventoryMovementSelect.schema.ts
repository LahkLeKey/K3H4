import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgricultureInventoryArgsObjectSchema as AgricultureInventoryArgsObjectSchema } from './AgricultureInventoryArgs.schema';
import { AgricultureShipmentArgsObjectSchema as AgricultureShipmentArgsObjectSchema } from './AgricultureShipmentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  inventoryId: z.boolean().optional(),
  inventory: z.union([z.boolean(), z.lazy(() => AgricultureInventoryArgsObjectSchema)]).optional(),
  shipmentId: z.boolean().optional(),
  shipment: z.union([z.boolean(), z.lazy(() => AgricultureShipmentArgsObjectSchema)]).optional(),
  type: z.boolean().optional(),
  quantity: z.boolean().optional(),
  reason: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const AgricultureInventoryMovementSelectObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementSelect>;
export const AgricultureInventoryMovementSelectObjectZodSchema = makeSchema();

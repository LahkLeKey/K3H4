import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { FreightLoadArgsObjectSchema as FreightLoadArgsObjectSchema } from './FreightLoadArgs.schema';
import { AgricultureInventoryMovementFindManySchema as AgricultureInventoryMovementFindManySchema } from '../findManyAgricultureInventoryMovement.schema';
import { AgricultureShipmentCountOutputTypeArgsObjectSchema as AgricultureShipmentCountOutputTypeArgsObjectSchema } from './AgricultureShipmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  lot: z.boolean().optional(),
  destination: z.boolean().optional(),
  mode: z.boolean().optional(),
  eta: z.boolean().optional(),
  freightLoadId: z.boolean().optional(),
  freightLoad: z.union([z.boolean(), z.lazy(() => FreightLoadArgsObjectSchema)]).optional(),
  inventoryMovements: z.union([z.boolean(), z.lazy(() => AgricultureInventoryMovementFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureShipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureShipmentSelectObjectSchema: z.ZodType<Prisma.AgricultureShipmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentSelect>;
export const AgricultureShipmentSelectObjectZodSchema = makeSchema();

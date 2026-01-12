import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgricultureInventoryArgsObjectSchema as AgricultureInventoryArgsObjectSchema } from './AgricultureInventoryArgs.schema';
import { AgricultureShipmentArgsObjectSchema as AgricultureShipmentArgsObjectSchema } from './AgricultureShipmentArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  inventory: z.union([z.boolean(), z.lazy(() => AgricultureInventoryArgsObjectSchema)]).optional(),
  shipment: z.union([z.boolean(), z.lazy(() => AgricultureShipmentArgsObjectSchema)]).optional()
}).strict();
export const AgricultureInventoryMovementIncludeObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementInclude>;
export const AgricultureInventoryMovementIncludeObjectZodSchema = makeSchema();

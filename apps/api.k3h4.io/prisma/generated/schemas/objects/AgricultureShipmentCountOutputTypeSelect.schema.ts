import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCountOutputTypeCountInventoryMovementsArgsObjectSchema as AgricultureShipmentCountOutputTypeCountInventoryMovementsArgsObjectSchema } from './AgricultureShipmentCountOutputTypeCountInventoryMovementsArgs.schema'

const makeSchema = () => z.object({
  inventoryMovements: z.union([z.boolean(), z.lazy(() => AgricultureShipmentCountOutputTypeCountInventoryMovementsArgsObjectSchema)]).optional()
}).strict();
export const AgricultureShipmentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AgricultureShipmentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCountOutputTypeSelect>;
export const AgricultureShipmentCountOutputTypeSelectObjectZodSchema = makeSchema();

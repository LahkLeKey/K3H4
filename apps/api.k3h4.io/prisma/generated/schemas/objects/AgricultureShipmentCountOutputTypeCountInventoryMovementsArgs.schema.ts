import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereInputObjectSchema as AgricultureInventoryMovementWhereInputObjectSchema } from './AgricultureInventoryMovementWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentCountOutputTypeCountInventoryMovementsArgsObjectSchema = makeSchema();
export const AgricultureShipmentCountOutputTypeCountInventoryMovementsArgsObjectZodSchema = makeSchema();

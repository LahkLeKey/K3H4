import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './WarehouseItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountWarehouseItemsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountWarehouseItemsArgsObjectZodSchema = makeSchema();

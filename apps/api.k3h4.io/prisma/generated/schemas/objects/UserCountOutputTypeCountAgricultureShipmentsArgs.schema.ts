import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAgricultureShipmentsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAgricultureShipmentsArgsObjectZodSchema = makeSchema();

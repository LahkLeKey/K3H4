import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional()
}).strict();
export const FreightLoadCountOutputTypeCountAgricultureShipmentsArgsObjectSchema = makeSchema();
export const FreightLoadCountOutputTypeCountAgricultureShipmentsArgsObjectZodSchema = makeSchema();

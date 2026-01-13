import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCountOutputTypeCountWarehouseItemsArgsObjectSchema as FreightLoadCountOutputTypeCountWarehouseItemsArgsObjectSchema } from './FreightLoadCountOutputTypeCountWarehouseItemsArgs.schema';
import { FreightLoadCountOutputTypeCountAgricultureShipmentsArgsObjectSchema as FreightLoadCountOutputTypeCountAgricultureShipmentsArgsObjectSchema } from './FreightLoadCountOutputTypeCountAgricultureShipmentsArgs.schema'

const makeSchema = () => z.object({
  warehouseItems: z.union([z.boolean(), z.lazy(() => FreightLoadCountOutputTypeCountWarehouseItemsArgsObjectSchema)]).optional(),
  agricultureShipments: z.union([z.boolean(), z.lazy(() => FreightLoadCountOutputTypeCountAgricultureShipmentsArgsObjectSchema)]).optional()
}).strict();
export const FreightLoadCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.FreightLoadCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCountOutputTypeSelect>;
export const FreightLoadCountOutputTypeSelectObjectZodSchema = makeSchema();

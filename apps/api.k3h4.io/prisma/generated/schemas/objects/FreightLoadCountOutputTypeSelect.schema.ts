import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCountOutputTypeCountWarehouseItemsArgsObjectSchema as FreightLoadCountOutputTypeCountWarehouseItemsArgsObjectSchema } from './FreightLoadCountOutputTypeCountWarehouseItemsArgs.schema'

const makeSchema = () => z.object({
  warehouseItems: z.union([z.boolean(), z.lazy(() => FreightLoadCountOutputTypeCountWarehouseItemsArgsObjectSchema)]).optional()
}).strict();
export const FreightLoadCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.FreightLoadCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCountOutputTypeSelect>;
export const FreightLoadCountOutputTypeSelectObjectZodSchema = makeSchema();

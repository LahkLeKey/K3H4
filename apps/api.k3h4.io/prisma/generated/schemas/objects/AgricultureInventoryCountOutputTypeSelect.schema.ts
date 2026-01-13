import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCountOutputTypeCountMovementsArgsObjectSchema as AgricultureInventoryCountOutputTypeCountMovementsArgsObjectSchema } from './AgricultureInventoryCountOutputTypeCountMovementsArgs.schema'

const makeSchema = () => z.object({
  movements: z.union([z.boolean(), z.lazy(() => AgricultureInventoryCountOutputTypeCountMovementsArgsObjectSchema)]).optional()
}).strict();
export const AgricultureInventoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AgricultureInventoryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCountOutputTypeSelect>;
export const AgricultureInventoryCountOutputTypeSelectObjectZodSchema = makeSchema();

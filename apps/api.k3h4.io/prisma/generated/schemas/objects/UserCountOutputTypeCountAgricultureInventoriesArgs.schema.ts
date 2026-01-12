import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './AgricultureInventoryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAgricultureInventoriesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAgricultureInventoriesArgsObjectZodSchema = makeSchema();

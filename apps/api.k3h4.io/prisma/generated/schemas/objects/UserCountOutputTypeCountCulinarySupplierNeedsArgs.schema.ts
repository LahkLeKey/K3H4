import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedWhereInputObjectSchema as CulinarySupplierNeedWhereInputObjectSchema } from './CulinarySupplierNeedWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectZodSchema = makeSchema();

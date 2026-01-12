import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './PosStoreWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountPosStoresArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountPosStoresArgsObjectZodSchema = makeSchema();

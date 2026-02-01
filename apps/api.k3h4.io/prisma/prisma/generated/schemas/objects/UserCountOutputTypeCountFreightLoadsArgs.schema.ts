import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountFreightLoadsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountFreightLoadsArgsObjectZodSchema = makeSchema();

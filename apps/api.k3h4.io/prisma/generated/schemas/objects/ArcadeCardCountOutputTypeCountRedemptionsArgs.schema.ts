import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardCountOutputTypeCountRedemptionsArgsObjectSchema = makeSchema();
export const ArcadeCardCountOutputTypeCountRedemptionsArgsObjectZodSchema = makeSchema();

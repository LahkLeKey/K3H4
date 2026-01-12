import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './ArcadePrizeWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountArcadePrizesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountArcadePrizesArgsObjectZodSchema = makeSchema();

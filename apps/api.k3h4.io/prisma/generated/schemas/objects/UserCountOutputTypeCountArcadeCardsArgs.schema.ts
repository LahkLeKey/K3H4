import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountArcadeCardsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountArcadeCardsArgsObjectZodSchema = makeSchema();

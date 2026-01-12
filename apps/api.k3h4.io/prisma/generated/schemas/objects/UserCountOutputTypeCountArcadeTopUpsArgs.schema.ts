import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './ArcadeTopUpWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountArcadeTopUpsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountArcadeTopUpsArgsObjectZodSchema = makeSchema();

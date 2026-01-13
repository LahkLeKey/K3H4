import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './ArcadeSessionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardCountOutputTypeCountSessionsArgsObjectSchema = makeSchema();
export const ArcadeCardCountOutputTypeCountSessionsArgsObjectZodSchema = makeSchema();

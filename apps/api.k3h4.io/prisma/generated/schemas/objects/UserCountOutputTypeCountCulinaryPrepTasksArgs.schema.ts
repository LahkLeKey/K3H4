import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskWhereInputObjectSchema as CulinaryPrepTaskWhereInputObjectSchema } from './CulinaryPrepTaskWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountCulinaryPrepTasksArgsObjectZodSchema = makeSchema();

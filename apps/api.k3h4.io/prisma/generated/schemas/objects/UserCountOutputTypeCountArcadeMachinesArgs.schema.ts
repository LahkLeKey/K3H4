import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './ArcadeMachineWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountArcadeMachinesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountArcadeMachinesArgsObjectZodSchema = makeSchema();

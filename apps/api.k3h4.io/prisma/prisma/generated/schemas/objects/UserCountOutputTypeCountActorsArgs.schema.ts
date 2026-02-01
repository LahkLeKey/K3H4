import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountActorsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountActorsArgsObjectZodSchema = makeSchema();

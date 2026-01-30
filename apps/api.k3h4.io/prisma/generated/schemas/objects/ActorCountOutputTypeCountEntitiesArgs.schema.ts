import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './EntityWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityWhereInputObjectSchema).optional()
}).strict();
export const ActorCountOutputTypeCountEntitiesArgsObjectSchema = makeSchema();
export const ActorCountOutputTypeCountEntitiesArgsObjectZodSchema = makeSchema();

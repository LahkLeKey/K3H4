import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountMaptilerQueriesArgsObjectZodSchema = makeSchema();

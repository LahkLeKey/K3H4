import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCountOutputTypeCountEntitiesArgsObjectSchema as ActorCountOutputTypeCountEntitiesArgsObjectSchema } from './ActorCountOutputTypeCountEntitiesArgs.schema';
import { ActorCountOutputTypeCountCachesArgsObjectSchema as ActorCountOutputTypeCountCachesArgsObjectSchema } from './ActorCountOutputTypeCountCachesArgs.schema'

const makeSchema = () => z.object({
  entities: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountEntitiesArgsObjectSchema)]).optional(),
  caches: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountCachesArgsObjectSchema)]).optional()
}).strict();
export const ActorCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ActorCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ActorCountOutputTypeSelect>;
export const ActorCountOutputTypeSelectObjectZodSchema = makeSchema();

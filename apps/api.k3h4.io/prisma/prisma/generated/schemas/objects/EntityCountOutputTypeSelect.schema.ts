import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCountOutputTypeCountCachesArgsObjectSchema as EntityCountOutputTypeCountCachesArgsObjectSchema } from './EntityCountOutputTypeCountCachesArgs.schema'

const makeSchema = () => z.object({
  caches: z.union([z.boolean(), z.lazy(() => EntityCountOutputTypeCountCachesArgsObjectSchema)]).optional()
}).strict();
export const EntityCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.EntityCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.EntityCountOutputTypeSelect>;
export const EntityCountOutputTypeSelectObjectZodSchema = makeSchema();

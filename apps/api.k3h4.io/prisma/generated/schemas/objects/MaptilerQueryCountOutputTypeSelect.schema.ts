import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCountOutputTypeCountCacheEntriesArgsObjectSchema as MaptilerQueryCountOutputTypeCountCacheEntriesArgsObjectSchema } from './MaptilerQueryCountOutputTypeCountCacheEntriesArgs.schema'

const makeSchema = () => z.object({
  cacheEntries: z.union([z.boolean(), z.lazy(() => MaptilerQueryCountOutputTypeCountCacheEntriesArgsObjectSchema)]).optional()
}).strict();
export const MaptilerQueryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MaptilerQueryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCountOutputTypeSelect>;
export const MaptilerQueryCountOutputTypeSelectObjectZodSchema = makeSchema();

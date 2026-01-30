import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  statusCode: z.literal(true).optional()
}).strict();
export const OsrmCacheEntrySumAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntrySumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntrySumAggregateInputType>;
export const OsrmCacheEntrySumAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  statusCode: z.literal(true).optional()
}).strict();
export const OsrmCacheEntryAvgAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryAvgAggregateInputType>;
export const OsrmCacheEntryAvgAggregateInputObjectZodSchema = makeSchema();

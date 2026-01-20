import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  statusCode: z.literal(true).optional()
}).strict();
export const MaptilerCacheEntryAvgAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryAvgAggregateInputType>;
export const MaptilerCacheEntryAvgAggregateInputObjectZodSchema = makeSchema();

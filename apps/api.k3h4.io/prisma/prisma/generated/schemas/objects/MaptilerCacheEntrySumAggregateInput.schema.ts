import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  statusCode: z.literal(true).optional()
}).strict();
export const MaptilerCacheEntrySumAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntrySumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntrySumAggregateInputType>;
export const MaptilerCacheEntrySumAggregateInputObjectZodSchema = makeSchema();

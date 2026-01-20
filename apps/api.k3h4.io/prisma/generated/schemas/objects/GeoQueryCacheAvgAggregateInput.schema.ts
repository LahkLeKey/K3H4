import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  count: z.literal(true).optional()
}).strict();
export const GeoQueryCacheAvgAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheAvgAggregateInputType>;
export const GeoQueryCacheAvgAggregateInputObjectZodSchema = makeSchema();

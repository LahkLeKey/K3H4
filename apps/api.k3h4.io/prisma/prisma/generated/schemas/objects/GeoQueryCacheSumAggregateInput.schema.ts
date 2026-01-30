import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  count: z.literal(true).optional()
}).strict();
export const GeoQueryCacheSumAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheSumAggregateInputType>;
export const GeoQueryCacheSumAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  count: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const GeoQueryCacheMaxAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheMaxAggregateInputType>;
export const GeoQueryCacheMaxAggregateInputObjectZodSchema = makeSchema();

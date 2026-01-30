import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  scope: z.literal(true).optional(),
  endpoint: z.literal(true).optional(),
  paramsHash: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ApiCacheEntryMaxAggregateInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryMaxAggregateInputType>;
export const ApiCacheEntryMaxAggregateInputObjectZodSchema = makeSchema();

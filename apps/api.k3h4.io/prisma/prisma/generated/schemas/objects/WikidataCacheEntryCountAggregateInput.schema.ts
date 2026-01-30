import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  resource: z.literal(true).optional(),
  endpoint: z.literal(true).optional(),
  params: z.literal(true).optional(),
  paramsHash: z.literal(true).optional(),
  url: z.literal(true).optional(),
  statusCode: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  cacheControlSeconds: z.literal(true).optional(),
  etag: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const WikidataCacheEntryCountAggregateInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryCountAggregateInputType>;
export const WikidataCacheEntryCountAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  queryId: z.literal(true).optional(),
  kind: z.literal(true).optional(),
  path: z.literal(true).optional(),
  params: z.literal(true).optional(),
  paramsHash: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  method: z.literal(true).optional(),
  responseType: z.literal(true).optional(),
  url: z.literal(true).optional(),
  statusCode: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  data: z.literal(true).optional(),
  contentType: z.literal(true).optional(),
  cacheControl: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const MaptilerCacheEntryCountAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCountAggregateInputType>;
export const MaptilerCacheEntryCountAggregateInputObjectZodSchema = makeSchema();

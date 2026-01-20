import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  source: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  z: z.literal(true).optional(),
  x: z.literal(true).optional(),
  y: z.literal(true).optional(),
  format: z.literal(true).optional(),
  url: z.literal(true).optional(),
  data: z.literal(true).optional(),
  byteLength: z.literal(true).optional(),
  etag: z.literal(true).optional(),
  cacheControl: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  lastAccessed: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const GeoDemTileCacheMinAggregateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheMinAggregateInputType>;
export const GeoDemTileCacheMinAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  service: z.literal(true).optional(),
  profile: z.literal(true).optional(),
  coordinates: z.literal(true).optional(),
  paramsHash: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  url: z.literal(true).optional(),
  statusCode: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const OsrmCacheEntryMinAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryMinAggregateInputType>;
export const OsrmCacheEntryMinAggregateInputObjectZodSchema = makeSchema();

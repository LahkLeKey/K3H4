import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  provider: z.boolean().optional(),
  source: z.boolean().optional(),
  signature: z.boolean().optional(),
  z: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  format: z.boolean().optional(),
  url: z.boolean().optional(),
  data: z.boolean().optional(),
  byteLength: z.boolean().optional(),
  etag: z.boolean().optional(),
  cacheControl: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  lastAccessed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const GeoDemTileCacheSelectObjectSchema: z.ZodType<Prisma.GeoDemTileCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheSelect>;
export const GeoDemTileCacheSelectObjectZodSchema = makeSchema();

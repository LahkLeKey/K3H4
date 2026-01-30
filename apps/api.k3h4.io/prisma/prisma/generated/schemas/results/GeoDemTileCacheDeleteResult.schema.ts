import * as z from 'zod';
export const GeoDemTileCacheDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  provider: z.string(),
  source: z.string().optional(),
  signature: z.string(),
  z: z.number().int(),
  x: z.number().int(),
  y: z.number().int(),
  format: z.string(),
  url: z.string().optional(),
  data: z.instanceof(Uint8Array).optional(),
  byteLength: z.number().int().optional(),
  etag: z.string().optional(),
  cacheControl: z.string().optional(),
  expiresAt: z.date().optional(),
  fetchedAt: z.date(),
  lastAccessed: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
}));
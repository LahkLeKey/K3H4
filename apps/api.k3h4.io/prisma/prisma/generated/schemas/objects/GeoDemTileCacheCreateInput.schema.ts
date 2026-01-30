import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutGeoDemTileCachesInputObjectSchema as UserCreateNestedOneWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateNestedOneWithoutGeoDemTileCachesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider: z.string().optional(),
  source: z.string().optional().nullable(),
  signature: z.string(),
  z: z.number().int(),
  x: z.number().int(),
  y: z.number().int(),
  format: z.string().optional(),
  url: z.string().optional().nullable(),
  data: z.instanceof(Uint8Array).optional().nullable(),
  byteLength: z.number().int().optional().nullable(),
  etag: z.string().optional().nullable(),
  cacheControl: z.string().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
  fetchedAt: z.coerce.date().optional(),
  lastAccessed: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGeoDemTileCachesInputObjectSchema).optional()
}).strict();
export const GeoDemTileCacheCreateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateInput>;
export const GeoDemTileCacheCreateInputObjectZodSchema = makeSchema();

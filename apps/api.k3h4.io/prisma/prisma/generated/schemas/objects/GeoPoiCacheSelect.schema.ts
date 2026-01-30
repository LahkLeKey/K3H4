import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  signature: z.boolean().optional(),
  centerLat: z.boolean().optional(),
  centerLng: z.boolean().optional(),
  radiusM: z.boolean().optional(),
  kinds: z.boolean().optional(),
  pois: z.boolean().optional(),
  count: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const GeoPoiCacheSelectObjectSchema: z.ZodType<Prisma.GeoPoiCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheSelect>;
export const GeoPoiCacheSelectObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { GeoDirectionFindManySchema as GeoDirectionFindManySchema } from '../findManyGeoDirection.schema';
import { GeoRouteCacheCountOutputTypeArgsObjectSchema as GeoRouteCacheCountOutputTypeArgsObjectSchema } from './GeoRouteCacheCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  provider: z.boolean().optional(),
  signature: z.boolean().optional(),
  originLat: z.boolean().optional(),
  originLng: z.boolean().optional(),
  destinationLat: z.boolean().optional(),
  destinationLng: z.boolean().optional(),
  distanceKm: z.boolean().optional(),
  durationMinutes: z.boolean().optional(),
  geojson: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  directions: z.union([z.boolean(), z.lazy(() => GeoDirectionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => GeoRouteCacheCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const GeoRouteCacheSelectObjectSchema: z.ZodType<Prisma.GeoRouteCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheSelect>;
export const GeoRouteCacheSelectObjectZodSchema = makeSchema();

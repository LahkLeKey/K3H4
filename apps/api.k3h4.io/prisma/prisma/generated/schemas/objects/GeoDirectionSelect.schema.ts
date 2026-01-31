import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { GeoDirectionStopFindManySchema as GeoDirectionStopFindManySchema } from '../findManyGeoDirectionStop.schema';
import { GeoDirectionSegmentFindManySchema as GeoDirectionSegmentFindManySchema } from '../findManyGeoDirectionSegment.schema';
import { GeoDirectionCountOutputTypeArgsObjectSchema as GeoDirectionCountOutputTypeArgsObjectSchema } from './GeoDirectionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actorId: z.boolean().optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  provider: z.boolean().optional(),
  profile: z.boolean().optional(),
  signature: z.boolean().optional(),
  inputPoints: z.boolean().optional(),
  originLat: z.boolean().optional(),
  originLng: z.boolean().optional(),
  destinationLat: z.boolean().optional(),
  destinationLng: z.boolean().optional(),
  distanceMeters: z.boolean().optional(),
  durationSeconds: z.boolean().optional(),
  geometry: z.boolean().optional(),
  instructions: z.boolean().optional(),
  payload: z.boolean().optional(),
  statusCode: z.boolean().optional(),
  statusMessage: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  stops: z.union([z.boolean(), z.lazy(() => GeoDirectionStopFindManySchema)]).optional(),
  segments: z.union([z.boolean(), z.lazy(() => GeoDirectionSegmentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => GeoDirectionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const GeoDirectionSelectObjectSchema: z.ZodType<Prisma.GeoDirectionSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSelect>;
export const GeoDirectionSelectObjectZodSchema = makeSchema();

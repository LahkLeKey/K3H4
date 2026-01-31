import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ActorOrderByWithRelationInputObjectSchema as ActorOrderByWithRelationInputObjectSchema } from './ActorOrderByWithRelationInput.schema';
import { GeoDirectionStopOrderByRelationAggregateInputObjectSchema as GeoDirectionStopOrderByRelationAggregateInputObjectSchema } from './GeoDirectionStopOrderByRelationAggregateInput.schema';
import { GeoDirectionSegmentOrderByRelationAggregateInputObjectSchema as GeoDirectionSegmentOrderByRelationAggregateInputObjectSchema } from './GeoDirectionSegmentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  actorId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  provider: SortOrderSchema.optional(),
  profile: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  inputPoints: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  originLat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  originLng: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  destinationLat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  destinationLng: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  distanceMeters: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  durationSeconds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  geometry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  instructions: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  statusMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  actor: z.lazy(() => ActorOrderByWithRelationInputObjectSchema).optional(),
  stops: z.lazy(() => GeoDirectionStopOrderByRelationAggregateInputObjectSchema).optional(),
  segments: z.lazy(() => GeoDirectionSegmentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const GeoDirectionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoDirectionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionOrderByWithRelationInput>;
export const GeoDirectionOrderByWithRelationInputObjectZodSchema = makeSchema();

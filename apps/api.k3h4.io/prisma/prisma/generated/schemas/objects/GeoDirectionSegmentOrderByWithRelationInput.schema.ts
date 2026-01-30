import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoDirectionOrderByWithRelationInputObjectSchema as GeoDirectionOrderByWithRelationInputObjectSchema } from './GeoDirectionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  directionId: SortOrderSchema.optional(),
  sequence: SortOrderSchema.optional(),
  instruction: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maneuverType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maneuverModifier: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  distanceMeters: SortOrderSchema.optional(),
  durationSeconds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startLat: SortOrderSchema.optional(),
  startLng: SortOrderSchema.optional(),
  endLat: SortOrderSchema.optional(),
  endLng: SortOrderSchema.optional(),
  geometry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  direction: z.lazy(() => GeoDirectionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const GeoDirectionSegmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentOrderByWithRelationInput>;
export const GeoDirectionSegmentOrderByWithRelationInputObjectZodSchema = makeSchema();

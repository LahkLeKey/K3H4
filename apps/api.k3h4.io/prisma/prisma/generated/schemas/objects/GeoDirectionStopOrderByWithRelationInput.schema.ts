import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoDirectionOrderByWithRelationInputObjectSchema as GeoDirectionOrderByWithRelationInputObjectSchema } from './GeoDirectionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  directionId: SortOrderSchema.optional(),
  sequence: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  label: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  osmId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  direction: z.lazy(() => GeoDirectionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const GeoDirectionStopOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopOrderByWithRelationInput>;
export const GeoDirectionStopOrderByWithRelationInputObjectZodSchema = makeSchema();

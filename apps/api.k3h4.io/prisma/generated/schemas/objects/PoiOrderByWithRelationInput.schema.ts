import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BuildingOrderByWithRelationInputObjectSchema as BuildingOrderByWithRelationInputObjectSchema } from './BuildingOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmType: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  category: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: SortOrderSchema.optional(),
  lastSeenAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  buildingId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  building: z.lazy(() => BuildingOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PoiOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PoiOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiOrderByWithRelationInput>;
export const PoiOrderByWithRelationInputObjectZodSchema = makeSchema();

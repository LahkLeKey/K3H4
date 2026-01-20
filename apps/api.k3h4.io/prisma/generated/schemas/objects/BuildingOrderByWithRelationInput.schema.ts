import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PoiOrderByRelationAggregateInputObjectSchema as PoiOrderByRelationAggregateInputObjectSchema } from './PoiOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  addressHouseNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressStreet: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressCity: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressPostcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressState: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  addressCountry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  geometry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  POIs: z.lazy(() => PoiOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const BuildingOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BuildingOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingOrderByWithRelationInput>;
export const BuildingOrderByWithRelationInputObjectZodSchema = makeSchema();

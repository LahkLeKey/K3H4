import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { WarehouseItemOrderByRelationAggregateInputObjectSchema as WarehouseItemOrderByRelationAggregateInputObjectSchema } from './WarehouseItemOrderByRelationAggregateInput.schema';
import { AgricultureShipmentOrderByRelationAggregateInputObjectSchema as AgricultureShipmentOrderByRelationAggregateInputObjectSchema } from './AgricultureShipmentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  originName: SortOrderSchema.optional(),
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationName: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  routeGeoJson: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const FreightLoadOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.FreightLoadOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadOrderByWithRelationInput>;
export const FreightLoadOrderByWithRelationInputObjectZodSchema = makeSchema();

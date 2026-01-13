import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgriculturePlotOrderByWithRelationInputObjectSchema as AgriculturePlotOrderByWithRelationInputObjectSchema } from './AgriculturePlotOrderByWithRelationInput.schema';
import { AgricultureTaskOrderByRelationAggregateInputObjectSchema as AgricultureTaskOrderByRelationAggregateInputObjectSchema } from './AgricultureTaskOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  crop: SortOrderSchema.optional(),
  phase: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  targetHarvestDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  plot: z.lazy(() => AgriculturePlotOrderByWithRelationInputObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanOrderByWithRelationInput>;
export const AgricultureCropPlanOrderByWithRelationInputObjectZodSchema = makeSchema();

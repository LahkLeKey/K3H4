import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgricultureCropPlanOrderByRelationAggregateInputObjectSchema as AgricultureCropPlanOrderByRelationAggregateInputObjectSchema } from './AgricultureCropPlanOrderByRelationAggregateInput.schema';
import { AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema as AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema } from './AgriculturePlotConditionOrderByRelationAggregateInput.schema';
import { AgricultureTaskOrderByRelationAggregateInputObjectSchema as AgricultureTaskOrderByRelationAggregateInputObjectSchema } from './AgricultureTaskOrderByRelationAggregateInput.schema';
import { AgricultureSlotOrderByRelationAggregateInputObjectSchema as AgricultureSlotOrderByRelationAggregateInputObjectSchema } from './AgricultureSlotOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  fieldCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  crop: SortOrderSchema.optional(),
  stage: SortOrderSchema.optional(),
  acres: SortOrderSchema.optional(),
  health: SortOrderSchema.optional(),
  soilType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  irrigationZone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastConditionAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  cropPlans: z.lazy(() => AgricultureCropPlanOrderByRelationAggregateInputObjectSchema).optional(),
  conditions: z.lazy(() => AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskOrderByRelationAggregateInputObjectSchema).optional(),
  slots: z.lazy(() => AgricultureSlotOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const AgriculturePlotOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgriculturePlotOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotOrderByWithRelationInput>;
export const AgriculturePlotOrderByWithRelationInputObjectZodSchema = makeSchema();

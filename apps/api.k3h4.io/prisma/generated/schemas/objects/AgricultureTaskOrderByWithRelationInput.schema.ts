import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgriculturePlotOrderByWithRelationInputObjectSchema as AgriculturePlotOrderByWithRelationInputObjectSchema } from './AgriculturePlotOrderByWithRelationInput.schema';
import { AgricultureCropPlanOrderByWithRelationInputObjectSchema as AgricultureCropPlanOrderByWithRelationInputObjectSchema } from './AgricultureCropPlanOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cropPlanId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: SortOrderSchema.optional(),
  assignee: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  priority: SortOrderSchema.optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dueDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  plot: z.lazy(() => AgriculturePlotOrderByWithRelationInputObjectSchema).optional(),
  cropPlan: z.lazy(() => AgricultureCropPlanOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AgricultureTaskOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureTaskOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskOrderByWithRelationInput>;
export const AgricultureTaskOrderByWithRelationInputObjectZodSchema = makeSchema();

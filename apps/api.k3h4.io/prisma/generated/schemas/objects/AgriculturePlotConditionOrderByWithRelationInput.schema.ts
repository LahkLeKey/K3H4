import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgriculturePlotOrderByWithRelationInputObjectSchema as AgriculturePlotOrderByWithRelationInputObjectSchema } from './AgriculturePlotOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  recordedAt: SortOrderSchema.optional(),
  temperature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  moisture: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  ph: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  plot: z.lazy(() => AgriculturePlotOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AgriculturePlotConditionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionOrderByWithRelationInput>;
export const AgriculturePlotConditionOrderByWithRelationInputObjectZodSchema = makeSchema();

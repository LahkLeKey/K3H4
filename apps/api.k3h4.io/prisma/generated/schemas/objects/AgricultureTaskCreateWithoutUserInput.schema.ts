import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { AgriculturePlotCreateNestedOneWithoutTasksInputObjectSchema as AgriculturePlotCreateNestedOneWithoutTasksInputObjectSchema } from './AgriculturePlotCreateNestedOneWithoutTasksInput.schema';
import { AgricultureCropPlanCreateNestedOneWithoutTasksInputObjectSchema as AgricultureCropPlanCreateNestedOneWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateNestedOneWithoutTasksInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  assignee: z.string().optional().nullable(),
  priority: z.number().int().optional(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  notes: z.string().optional().nullable(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  plot: z.lazy(() => AgriculturePlotCreateNestedOneWithoutTasksInputObjectSchema).optional(),
  cropPlan: z.lazy(() => AgricultureCropPlanCreateNestedOneWithoutTasksInputObjectSchema).optional()
}).strict();
export const AgricultureTaskCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateWithoutUserInput>;
export const AgricultureTaskCreateWithoutUserInputObjectZodSchema = makeSchema();

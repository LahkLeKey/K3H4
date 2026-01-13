import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema';
import { AgricultureCropPlanArgsObjectSchema as AgricultureCropPlanArgsObjectSchema } from './AgricultureCropPlanArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  plotId: z.boolean().optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional(),
  cropPlanId: z.boolean().optional(),
  cropPlan: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  assignee: z.boolean().optional(),
  priority: z.boolean().optional(),
  tags: z.boolean().optional(),
  notes: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const AgricultureTaskSelectObjectSchema: z.ZodType<Prisma.AgricultureTaskSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskSelect>;
export const AgricultureTaskSelectObjectZodSchema = makeSchema();

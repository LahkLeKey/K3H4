import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  plotId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional(),
  recordedAt: z.boolean().optional(),
  temperature: z.boolean().optional(),
  moisture: z.boolean().optional(),
  ph: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const AgriculturePlotConditionSelectObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionSelect>;
export const AgriculturePlotConditionSelectObjectZodSchema = makeSchema();

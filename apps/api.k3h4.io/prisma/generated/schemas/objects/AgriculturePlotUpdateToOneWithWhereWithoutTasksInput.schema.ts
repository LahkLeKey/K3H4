import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgriculturePlotUpdateWithoutTasksInputObjectSchema as AgriculturePlotUpdateWithoutTasksInputObjectSchema } from './AgriculturePlotUpdateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgriculturePlotUpdateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema)])
}).strict();
export const AgriculturePlotUpdateToOneWithWhereWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutTasksInput>;
export const AgriculturePlotUpdateToOneWithWhereWithoutTasksInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotUpdateWithoutTasksInputObjectSchema as AgriculturePlotUpdateWithoutTasksInputObjectSchema } from './AgriculturePlotUpdateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutTasksInput.schema';
import { AgriculturePlotCreateWithoutTasksInputObjectSchema as AgriculturePlotCreateWithoutTasksInputObjectSchema } from './AgriculturePlotCreateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutTasksInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgriculturePlotUpdateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema)]),
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotUpsertWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpsertWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpsertWithoutTasksInput>;
export const AgriculturePlotUpsertWithoutTasksInputObjectZodSchema = makeSchema();

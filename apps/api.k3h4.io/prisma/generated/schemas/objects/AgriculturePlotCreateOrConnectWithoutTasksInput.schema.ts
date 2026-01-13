import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCreateWithoutTasksInputObjectSchema as AgriculturePlotCreateWithoutTasksInputObjectSchema } from './AgriculturePlotCreateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema)])
}).strict();
export const AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutTasksInput>;
export const AgriculturePlotCreateOrConnectWithoutTasksInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutTasksInputObjectSchema as AgriculturePlotCreateWithoutTasksInputObjectSchema } from './AgriculturePlotCreateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutTasksInput.schema';
import { AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema as AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutTasksInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCreateNestedOneWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutTasksInput>;
export const AgriculturePlotCreateNestedOneWithoutTasksInputObjectZodSchema = makeSchema();

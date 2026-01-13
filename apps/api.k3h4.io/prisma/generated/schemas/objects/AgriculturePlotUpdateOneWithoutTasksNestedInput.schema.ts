import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutTasksInputObjectSchema as AgriculturePlotCreateWithoutTasksInputObjectSchema } from './AgriculturePlotCreateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutTasksInput.schema';
import { AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema as AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutTasksInput.schema';
import { AgriculturePlotUpsertWithoutTasksInputObjectSchema as AgriculturePlotUpsertWithoutTasksInputObjectSchema } from './AgriculturePlotUpsertWithoutTasksInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateToOneWithWhereWithoutTasksInputObjectSchema as AgriculturePlotUpdateToOneWithWhereWithoutTasksInputObjectSchema } from './AgriculturePlotUpdateToOneWithWhereWithoutTasksInput.schema';
import { AgriculturePlotUpdateWithoutTasksInputObjectSchema as AgriculturePlotUpdateWithoutTasksInputObjectSchema } from './AgriculturePlotUpdateWithoutTasksInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutTasksInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutTasksInputObjectSchema).optional(),
  upsert: z.lazy(() => AgriculturePlotUpsertWithoutTasksInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgriculturePlotUpdateToOneWithWhereWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUpdateWithoutTasksInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutTasksInputObjectSchema)]).optional()
}).strict();
export const AgriculturePlotUpdateOneWithoutTasksNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateOneWithoutTasksNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateOneWithoutTasksNestedInput>;
export const AgriculturePlotUpdateOneWithoutTasksNestedInputObjectZodSchema = makeSchema();

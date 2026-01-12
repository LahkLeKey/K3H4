import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutSlotsInputObjectSchema as AgriculturePlotCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutSlotsInput.schema';
import { AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema as AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutSlotsInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCreateNestedOneWithoutSlotsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutSlotsInput>;
export const AgriculturePlotCreateNestedOneWithoutSlotsInputObjectZodSchema = makeSchema();

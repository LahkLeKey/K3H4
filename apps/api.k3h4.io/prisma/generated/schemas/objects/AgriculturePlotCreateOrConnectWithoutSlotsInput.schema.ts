import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCreateWithoutSlotsInputObjectSchema as AgriculturePlotCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutSlotsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema)])
}).strict();
export const AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutSlotsInput>;
export const AgriculturePlotCreateOrConnectWithoutSlotsInputObjectZodSchema = makeSchema();

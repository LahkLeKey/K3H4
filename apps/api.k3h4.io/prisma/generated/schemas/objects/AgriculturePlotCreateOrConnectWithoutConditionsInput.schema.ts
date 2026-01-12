import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCreateWithoutConditionsInputObjectSchema as AgriculturePlotCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotCreateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutConditionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema)])
}).strict();
export const AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutConditionsInput>;
export const AgriculturePlotCreateOrConnectWithoutConditionsInputObjectZodSchema = makeSchema();

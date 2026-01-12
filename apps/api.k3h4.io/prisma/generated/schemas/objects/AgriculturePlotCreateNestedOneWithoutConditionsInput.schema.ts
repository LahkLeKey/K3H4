import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutConditionsInputObjectSchema as AgriculturePlotCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotCreateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutConditionsInput.schema';
import { AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema as AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutConditionsInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCreateNestedOneWithoutConditionsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutConditionsInput>;
export const AgriculturePlotCreateNestedOneWithoutConditionsInputObjectZodSchema = makeSchema();

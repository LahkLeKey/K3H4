import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCreateWithoutUserInputObjectSchema as AgriculturePlotCreateWithoutUserInputObjectSchema } from './AgriculturePlotCreateWithoutUserInput.schema';
import { AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutUserInput>;
export const AgriculturePlotCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

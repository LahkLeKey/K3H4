import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateWithoutPlotInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateOrConnectWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateOrConnectWithoutPlotInput>;
export const AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectZodSchema = makeSchema();

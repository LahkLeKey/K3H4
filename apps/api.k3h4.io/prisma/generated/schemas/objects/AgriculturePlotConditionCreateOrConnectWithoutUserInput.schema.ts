import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionCreateWithoutUserInputObjectSchema as AgriculturePlotConditionCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateOrConnectWithoutUserInput>;
export const AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

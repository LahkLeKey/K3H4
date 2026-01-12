import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionUpdateWithoutUserInputObjectSchema as AgriculturePlotConditionUpdateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUpdateWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedUpdateWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedUpdateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgriculturePlotConditionUpdateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInput>;
export const AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

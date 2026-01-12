import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionUpdateWithoutPlotInputObjectSchema as AgriculturePlotConditionUpdateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUpdateWithoutPlotInput.schema';
import { AgriculturePlotConditionUncheckedUpdateWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedUpdateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgriculturePlotConditionUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedUpdateWithoutPlotInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInput>;
export const AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

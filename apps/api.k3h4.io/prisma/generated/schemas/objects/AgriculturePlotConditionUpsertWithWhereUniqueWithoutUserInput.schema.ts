import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionUpdateWithoutUserInputObjectSchema as AgriculturePlotConditionUpdateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUpdateWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedUpdateWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedUpdateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateWithoutUserInput.schema';
import { AgriculturePlotConditionCreateWithoutUserInputObjectSchema as AgriculturePlotConditionCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgriculturePlotConditionUpdateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInput>;
export const AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionUpdateWithoutPlotInputObjectSchema as AgriculturePlotConditionUpdateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUpdateWithoutPlotInput.schema';
import { AgriculturePlotConditionUncheckedUpdateWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedUpdateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateWithoutPlotInput.schema';
import { AgriculturePlotConditionCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateWithoutPlotInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgriculturePlotConditionUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedUpdateWithoutPlotInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInput>;
export const AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateWithoutUserInputObjectSchema as AgriculturePlotUpdateWithoutUserInputObjectSchema } from './AgriculturePlotUpdateWithoutUserInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutUserInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutUserInput.schema';
import { AgriculturePlotCreateWithoutUserInputObjectSchema as AgriculturePlotCreateWithoutUserInputObjectSchema } from './AgriculturePlotCreateWithoutUserInput.schema';
import { AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgriculturePlotUpdateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpsertWithWhereUniqueWithoutUserInput>;
export const AgriculturePlotUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

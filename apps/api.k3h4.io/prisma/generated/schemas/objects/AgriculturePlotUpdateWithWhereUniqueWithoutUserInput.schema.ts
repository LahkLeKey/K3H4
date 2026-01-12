import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateWithoutUserInputObjectSchema as AgriculturePlotUpdateWithoutUserInputObjectSchema } from './AgriculturePlotUpdateWithoutUserInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutUserInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgriculturePlotUpdateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateWithWhereUniqueWithoutUserInput>;
export const AgriculturePlotUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

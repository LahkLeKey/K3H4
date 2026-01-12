import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgriculturePlotUpdateWithoutConditionsInputObjectSchema as AgriculturePlotUpdateWithoutConditionsInputObjectSchema } from './AgriculturePlotUpdateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutConditionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgriculturePlotUpdateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema)])
}).strict();
export const AgriculturePlotUpdateToOneWithWhereWithoutConditionsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutConditionsInput>;
export const AgriculturePlotUpdateToOneWithWhereWithoutConditionsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgriculturePlotUpdateWithoutSlotsInputObjectSchema as AgriculturePlotUpdateWithoutSlotsInputObjectSchema } from './AgriculturePlotUpdateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutSlotsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgriculturePlotUpdateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema)])
}).strict();
export const AgriculturePlotUpdateToOneWithWhereWithoutSlotsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutSlotsInput>;
export const AgriculturePlotUpdateToOneWithWhereWithoutSlotsInputObjectZodSchema = makeSchema();

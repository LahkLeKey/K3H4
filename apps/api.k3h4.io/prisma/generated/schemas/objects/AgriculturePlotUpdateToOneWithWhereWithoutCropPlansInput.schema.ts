import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgriculturePlotUpdateWithoutCropPlansInputObjectSchema as AgriculturePlotUpdateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUpdateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutCropPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgriculturePlotUpdateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema)])
}).strict();
export const AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInput>;
export const AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInputObjectZodSchema = makeSchema();

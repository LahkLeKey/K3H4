import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotUpdateWithoutCropPlansInputObjectSchema as AgriculturePlotUpdateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUpdateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutCropPlansInput.schema';
import { AgriculturePlotCreateWithoutCropPlansInputObjectSchema as AgriculturePlotCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutCropPlansInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgriculturePlotUpdateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema)]),
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotUpsertWithoutCropPlansInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpsertWithoutCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpsertWithoutCropPlansInput>;
export const AgriculturePlotUpsertWithoutCropPlansInputObjectZodSchema = makeSchema();

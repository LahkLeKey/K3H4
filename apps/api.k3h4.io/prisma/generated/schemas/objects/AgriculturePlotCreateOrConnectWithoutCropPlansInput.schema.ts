import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCreateWithoutCropPlansInputObjectSchema as AgriculturePlotCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutCropPlansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema)])
}).strict();
export const AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateOrConnectWithoutCropPlansInput>;
export const AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutCropPlansInputObjectSchema as AgriculturePlotCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutCropPlansInput.schema';
import { AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema as AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutCropPlansInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateNestedOneWithoutCropPlansInput>;
export const AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutCropPlansInputObjectSchema as AgriculturePlotCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutCropPlansInput.schema';
import { AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema as AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutCropPlansInput.schema';
import { AgriculturePlotUpsertWithoutCropPlansInputObjectSchema as AgriculturePlotUpsertWithoutCropPlansInputObjectSchema } from './AgriculturePlotUpsertWithoutCropPlansInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInputObjectSchema as AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInputObjectSchema } from './AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInput.schema';
import { AgriculturePlotUpdateWithoutCropPlansInputObjectSchema as AgriculturePlotUpdateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUpdateWithoutCropPlansInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutCropPlansInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutCropPlansInputObjectSchema).optional(),
  upsert: z.lazy(() => AgriculturePlotUpsertWithoutCropPlansInputObjectSchema).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgriculturePlotUpdateToOneWithWhereWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUpdateWithoutCropPlansInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutCropPlansInputObjectSchema)]).optional()
}).strict();
export const AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInput>;
export const AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInputObjectZodSchema = makeSchema();

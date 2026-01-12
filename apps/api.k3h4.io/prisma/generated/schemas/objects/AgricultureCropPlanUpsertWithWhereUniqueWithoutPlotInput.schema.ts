import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateWithoutPlotInputObjectSchema as AgricultureCropPlanUpdateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUpdateWithoutPlotInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutPlotInput.schema';
import { AgricultureCropPlanCreateWithoutPlotInputObjectSchema as AgricultureCropPlanCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateWithoutPlotInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureCropPlanUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutPlotInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInput>;
export const AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateWithoutPlotInputObjectSchema as AgricultureCropPlanUpdateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUpdateWithoutPlotInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureCropPlanUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInput>;
export const AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

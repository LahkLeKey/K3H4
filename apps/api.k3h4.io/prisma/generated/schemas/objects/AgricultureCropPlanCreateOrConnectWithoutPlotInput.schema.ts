import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanCreateWithoutPlotInputObjectSchema as AgricultureCropPlanCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateWithoutPlotInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateOrConnectWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateOrConnectWithoutPlotInput>;
export const AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectZodSchema = makeSchema();

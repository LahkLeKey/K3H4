import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanScalarWhereInputObjectSchema as AgricultureCropPlanScalarWhereInputObjectSchema } from './AgricultureCropPlanScalarWhereInput.schema';
import { AgricultureCropPlanUpdateManyMutationInputObjectSchema as AgricultureCropPlanUpdateManyMutationInputObjectSchema } from './AgricultureCropPlanUpdateManyMutationInput.schema';
import { AgricultureCropPlanUncheckedUpdateManyWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedUpdateManyWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateManyWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureCropPlanUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateManyWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpdateManyWithWhereWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateManyWithWhereWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateManyWithWhereWithoutPlotInput>;
export const AgricultureCropPlanUpdateManyWithWhereWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateWithoutUserInputObjectSchema as AgricultureCropPlanUpdateWithoutUserInputObjectSchema } from './AgricultureCropPlanUpdateWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureCropPlanUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInput>;
export const AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

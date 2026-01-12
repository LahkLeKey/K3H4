import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithoutCropPlanInputObjectSchema as AgricultureTaskUpdateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUpdateWithoutCropPlanInput.schema';
import { AgricultureTaskUncheckedUpdateWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedUpdateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedUpdateWithoutCropPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureTaskUpdateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateWithoutCropPlanInputObjectSchema)])
}).strict();
export const AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInput>;
export const AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInputObjectZodSchema = makeSchema();

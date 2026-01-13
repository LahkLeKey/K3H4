import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema';
import { AgricultureCropPlanUpdateWithoutTasksInputObjectSchema as AgricultureCropPlanUpdateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUpdateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgricultureCropPlanUpdateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInput>;
export const AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInputObjectZodSchema = makeSchema();

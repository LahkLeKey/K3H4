import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanUpdateWithoutTasksInputObjectSchema as AgricultureCropPlanUpdateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUpdateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutTasksInput.schema';
import { AgricultureCropPlanCreateWithoutTasksInputObjectSchema as AgricultureCropPlanCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutTasksInput.schema';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgricultureCropPlanUpdateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema)]),
  where: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanUpsertWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpsertWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpsertWithoutTasksInput>;
export const AgricultureCropPlanUpsertWithoutTasksInputObjectZodSchema = makeSchema();

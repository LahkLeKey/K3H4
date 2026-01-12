import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanCreateWithoutTasksInputObjectSchema as AgricultureCropPlanCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema)])
}).strict();
export const AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateOrConnectWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateOrConnectWithoutTasksInput>;
export const AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectZodSchema = makeSchema();

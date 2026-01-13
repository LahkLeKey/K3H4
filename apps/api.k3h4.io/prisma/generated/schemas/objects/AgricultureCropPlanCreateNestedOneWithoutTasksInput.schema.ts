import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateWithoutTasksInputObjectSchema as AgricultureCropPlanCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutTasksInput.schema';
import { AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema as AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateOrConnectWithoutTasksInput.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema).optional(),
  connect: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanCreateNestedOneWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateNestedOneWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateNestedOneWithoutTasksInput>;
export const AgricultureCropPlanCreateNestedOneWithoutTasksInputObjectZodSchema = makeSchema();

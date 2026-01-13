import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateWithoutTasksInputObjectSchema as AgricultureCropPlanCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutTasksInput.schema';
import { AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema as AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema } from './AgricultureCropPlanCreateOrConnectWithoutTasksInput.schema';
import { AgricultureCropPlanUpsertWithoutTasksInputObjectSchema as AgricultureCropPlanUpsertWithoutTasksInputObjectSchema } from './AgricultureCropPlanUpsertWithoutTasksInput.schema';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInputObjectSchema as AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInputObjectSchema } from './AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInput.schema';
import { AgricultureCropPlanUpdateWithoutTasksInputObjectSchema as AgricultureCropPlanUpdateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUpdateWithoutTasksInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutTasksInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutTasksInputObjectSchema).optional(),
  upsert: z.lazy(() => AgricultureCropPlanUpsertWithoutTasksInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgricultureCropPlanUpdateToOneWithWhereWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUpdateWithoutTasksInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutTasksInputObjectSchema)]).optional()
}).strict();
export const AgricultureCropPlanUpdateOneWithoutTasksNestedInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateOneWithoutTasksNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateOneWithoutTasksNestedInput>;
export const AgricultureCropPlanUpdateOneWithoutTasksNestedInputObjectZodSchema = makeSchema();

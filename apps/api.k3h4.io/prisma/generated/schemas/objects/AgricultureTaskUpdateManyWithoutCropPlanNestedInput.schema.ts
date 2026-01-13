import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateWithoutCropPlanInputObjectSchema as AgricultureTaskCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateWithoutCropPlanInput.schema';
import { AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutCropPlanInput.schema';
import { AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema as AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateOrConnectWithoutCropPlanInput.schema';
import { AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInputObjectSchema as AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInputObjectSchema } from './AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInput.schema';
import { AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema as AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema } from './AgricultureTaskCreateManyCropPlanInputEnvelope.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInputObjectSchema as AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInputObjectSchema } from './AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInput.schema';
import { AgricultureTaskUpdateManyWithWhereWithoutCropPlanInputObjectSchema as AgricultureTaskUpdateManyWithWhereWithoutCropPlanInputObjectSchema } from './AgricultureTaskUpdateManyWithWhereWithoutCropPlanInput.schema';
import { AgricultureTaskScalarWhereInputObjectSchema as AgricultureTaskScalarWhereInputObjectSchema } from './AgricultureTaskScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskCreateWithoutCropPlanInputObjectSchema).array(), z.lazy(() => AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUpdateWithWhereUniqueWithoutCropPlanInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureTaskUpdateManyWithWhereWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUpdateManyWithWhereWithoutCropPlanInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema), z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureTaskUpdateManyWithoutCropPlanNestedInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyWithoutCropPlanNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyWithoutCropPlanNestedInput>;
export const AgricultureTaskUpdateManyWithoutCropPlanNestedInputObjectZodSchema = makeSchema();

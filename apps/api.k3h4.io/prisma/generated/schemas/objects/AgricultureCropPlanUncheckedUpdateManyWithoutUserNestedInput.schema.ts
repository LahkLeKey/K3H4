import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateWithoutUserInputObjectSchema as AgricultureCropPlanCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutUserInput.schema';
import { AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema as AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateOrConnectWithoutUserInput.schema';
import { AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema as AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema } from './AgricultureCropPlanCreateManyUserInputEnvelope.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgricultureCropPlanUpdateManyWithWhereWithoutUserInputObjectSchema as AgricultureCropPlanUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgricultureCropPlanUpdateManyWithWhereWithoutUserInput.schema';
import { AgricultureCropPlanScalarWhereInputObjectSchema as AgricultureCropPlanScalarWhereInputObjectSchema } from './AgricultureCropPlanScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureCropPlanUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema), z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInput>;
export const AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

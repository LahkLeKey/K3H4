import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateWithoutPlotInputObjectSchema as AgricultureCropPlanCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateWithoutPlotInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutPlotInput.schema';
import { AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema as AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateOrConnectWithoutPlotInput.schema';
import { AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInputObjectSchema as AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInputObjectSchema } from './AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInput.schema';
import { AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema as AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema } from './AgricultureCropPlanCreateManyPlotInputEnvelope.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInputObjectSchema as AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInputObjectSchema } from './AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInput.schema';
import { AgricultureCropPlanUpdateManyWithWhereWithoutPlotInputObjectSchema as AgricultureCropPlanUpdateManyWithWhereWithoutPlotInputObjectSchema } from './AgricultureCropPlanUpdateManyWithWhereWithoutPlotInput.schema';
import { AgricultureCropPlanScalarWhereInputObjectSchema as AgricultureCropPlanScalarWhereInputObjectSchema } from './AgricultureCropPlanScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUpsertWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUpdateWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureCropPlanUpdateManyWithWhereWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUpdateManyWithWhereWithoutPlotInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema), z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureCropPlanUpdateManyWithoutPlotNestedInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateManyWithoutPlotNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateManyWithoutPlotNestedInput>;
export const AgricultureCropPlanUpdateManyWithoutPlotNestedInputObjectZodSchema = makeSchema();

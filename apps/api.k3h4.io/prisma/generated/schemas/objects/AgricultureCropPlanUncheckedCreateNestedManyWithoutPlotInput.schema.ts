import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateWithoutPlotInputObjectSchema as AgricultureCropPlanCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateWithoutPlotInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutPlotInput.schema';
import { AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema as AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateOrConnectWithoutPlotInput.schema';
import { AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema as AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema } from './AgricultureCropPlanCreateManyPlotInputEnvelope.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureCropPlanCreateManyPlotInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureCropPlanUncheckedCreateNestedManyWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUncheckedCreateNestedManyWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUncheckedCreateNestedManyWithoutPlotInput>;
export const AgricultureCropPlanUncheckedCreateNestedManyWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateWithoutUserInputObjectSchema as AgricultureCropPlanCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutUserInput.schema';
import { AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema as AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateOrConnectWithoutUserInput.schema';
import { AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema as AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema } from './AgricultureCropPlanCreateManyUserInputEnvelope.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureCropPlanCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureCropPlanCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateNestedManyWithoutUserInput>;
export const AgricultureCropPlanCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();

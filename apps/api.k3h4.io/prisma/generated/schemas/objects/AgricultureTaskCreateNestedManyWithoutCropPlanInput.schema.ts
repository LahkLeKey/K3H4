import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateWithoutCropPlanInputObjectSchema as AgricultureTaskCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateWithoutCropPlanInput.schema';
import { AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutCropPlanInput.schema';
import { AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema as AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateOrConnectWithoutCropPlanInput.schema';
import { AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema as AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema } from './AgricultureTaskCreateManyCropPlanInputEnvelope.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskCreateWithoutCropPlanInputObjectSchema).array(), z.lazy(() => AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateNestedManyWithoutCropPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateNestedManyWithoutCropPlanInput>;
export const AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectZodSchema = makeSchema();

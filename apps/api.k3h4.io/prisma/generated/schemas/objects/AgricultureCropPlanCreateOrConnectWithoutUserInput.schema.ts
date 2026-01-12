import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanCreateWithoutUserInputObjectSchema as AgricultureCropPlanCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureCropPlanCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateOrConnectWithoutUserInput>;
export const AgricultureCropPlanCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

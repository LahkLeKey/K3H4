import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanUpdateWithoutUserInputObjectSchema as AgricultureCropPlanUpdateWithoutUserInputObjectSchema } from './AgricultureCropPlanUpdateWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedUpdateWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateWithoutUserInput.schema';
import { AgricultureCropPlanCreateWithoutUserInputObjectSchema as AgricultureCropPlanCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureCropPlanUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureCropPlanCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInput>;
export const AgricultureCropPlanUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

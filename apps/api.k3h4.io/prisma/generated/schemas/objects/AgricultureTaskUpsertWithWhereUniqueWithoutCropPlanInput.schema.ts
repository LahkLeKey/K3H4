import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithoutCropPlanInputObjectSchema as AgricultureTaskUpdateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUpdateWithoutCropPlanInput.schema';
import { AgricultureTaskUncheckedUpdateWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedUpdateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedUpdateWithoutCropPlanInput.schema';
import { AgricultureTaskCreateWithoutCropPlanInputObjectSchema as AgricultureTaskCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateWithoutCropPlanInput.schema';
import { AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutCropPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureTaskUpdateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateWithoutCropPlanInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema)])
}).strict();
export const AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInput>;
export const AgricultureTaskUpsertWithWhereUniqueWithoutCropPlanInputObjectZodSchema = makeSchema();

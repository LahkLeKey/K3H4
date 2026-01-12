import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskCreateWithoutCropPlanInputObjectSchema as AgricultureTaskCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateWithoutCropPlanInput.schema';
import { AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutCropPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutCropPlanInputObjectSchema)])
}).strict();
export const AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateOrConnectWithoutCropPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateOrConnectWithoutCropPlanInput>;
export const AgricultureTaskCreateOrConnectWithoutCropPlanInputObjectZodSchema = makeSchema();

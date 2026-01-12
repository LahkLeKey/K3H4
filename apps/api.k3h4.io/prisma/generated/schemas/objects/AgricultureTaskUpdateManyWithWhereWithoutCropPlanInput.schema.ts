import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskScalarWhereInputObjectSchema as AgricultureTaskScalarWhereInputObjectSchema } from './AgricultureTaskScalarWhereInput.schema';
import { AgricultureTaskUpdateManyMutationInputObjectSchema as AgricultureTaskUpdateManyMutationInputObjectSchema } from './AgricultureTaskUpdateManyMutationInput.schema';
import { AgricultureTaskUncheckedUpdateManyWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedUpdateManyWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedUpdateManyWithoutCropPlanInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureTaskUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateManyWithoutCropPlanInputObjectSchema)])
}).strict();
export const AgricultureTaskUpdateManyWithWhereWithoutCropPlanInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyWithWhereWithoutCropPlanInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyWithWhereWithoutCropPlanInput>;
export const AgricultureTaskUpdateManyWithWhereWithoutCropPlanInputObjectZodSchema = makeSchema();

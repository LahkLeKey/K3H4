import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanScalarWhereInputObjectSchema as AgricultureCropPlanScalarWhereInputObjectSchema } from './AgricultureCropPlanScalarWhereInput.schema';
import { AgricultureCropPlanUpdateManyMutationInputObjectSchema as AgricultureCropPlanUpdateManyMutationInputObjectSchema } from './AgricultureCropPlanUpdateManyMutationInput.schema';
import { AgricultureCropPlanUncheckedUpdateManyWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureCropPlanUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureCropPlanUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureCropPlanUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateManyWithWhereWithoutUserInput>;
export const AgricultureCropPlanUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();

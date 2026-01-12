import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionScalarWhereInputObjectSchema as AgriculturePlotConditionScalarWhereInputObjectSchema } from './AgriculturePlotConditionScalarWhereInput.schema';
import { AgriculturePlotConditionUpdateManyMutationInputObjectSchema as AgriculturePlotConditionUpdateManyMutationInputObjectSchema } from './AgriculturePlotConditionUpdateManyMutationInput.schema';
import { AgriculturePlotConditionUncheckedUpdateManyWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedUpdateManyWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateManyWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgriculturePlotConditionUpdateManyMutationInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedUpdateManyWithoutPlotInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInput>;
export const AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionScalarWhereInputObjectSchema as AgriculturePlotConditionScalarWhereInputObjectSchema } from './AgriculturePlotConditionScalarWhereInput.schema';
import { AgriculturePlotConditionUpdateManyMutationInputObjectSchema as AgriculturePlotConditionUpdateManyMutationInputObjectSchema } from './AgriculturePlotConditionUpdateManyMutationInput.schema';
import { AgriculturePlotConditionUncheckedUpdateManyWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgriculturePlotConditionUpdateManyMutationInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotConditionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateManyWithWhereWithoutUserInput>;
export const AgriculturePlotConditionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();

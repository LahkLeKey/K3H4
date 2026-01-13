import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotScalarWhereInputObjectSchema as AgriculturePlotScalarWhereInputObjectSchema } from './AgriculturePlotScalarWhereInput.schema';
import { AgriculturePlotUpdateManyMutationInputObjectSchema as AgriculturePlotUpdateManyMutationInputObjectSchema } from './AgriculturePlotUpdateManyMutationInput.schema';
import { AgriculturePlotUncheckedUpdateManyWithoutUserInputObjectSchema as AgriculturePlotUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgriculturePlotUpdateManyMutationInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgriculturePlotUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateManyWithWhereWithoutUserInput>;
export const AgriculturePlotUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();

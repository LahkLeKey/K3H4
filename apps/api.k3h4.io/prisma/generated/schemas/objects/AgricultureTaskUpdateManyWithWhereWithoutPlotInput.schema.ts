import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskScalarWhereInputObjectSchema as AgricultureTaskScalarWhereInputObjectSchema } from './AgricultureTaskScalarWhereInput.schema';
import { AgricultureTaskUpdateManyMutationInputObjectSchema as AgricultureTaskUpdateManyMutationInputObjectSchema } from './AgricultureTaskUpdateManyMutationInput.schema';
import { AgricultureTaskUncheckedUpdateManyWithoutPlotInputObjectSchema as AgricultureTaskUncheckedUpdateManyWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedUpdateManyWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureTaskUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateManyWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureTaskUpdateManyWithWhereWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyWithWhereWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyWithWhereWithoutPlotInput>;
export const AgricultureTaskUpdateManyWithWhereWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotScalarWhereInputObjectSchema as AgricultureSlotScalarWhereInputObjectSchema } from './AgricultureSlotScalarWhereInput.schema';
import { AgricultureSlotUpdateManyMutationInputObjectSchema as AgricultureSlotUpdateManyMutationInputObjectSchema } from './AgricultureSlotUpdateManyMutationInput.schema';
import { AgricultureSlotUncheckedUpdateManyWithoutPlotInputObjectSchema as AgricultureSlotUncheckedUpdateManyWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedUpdateManyWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureSlotUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedUpdateManyWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureSlotUpdateManyWithWhereWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpdateManyWithWhereWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateManyWithWhereWithoutPlotInput>;
export const AgricultureSlotUpdateManyWithWhereWithoutPlotInputObjectZodSchema = makeSchema();

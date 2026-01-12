import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotUpdateWithoutPlotInputObjectSchema as AgricultureSlotUpdateWithoutPlotInputObjectSchema } from './AgricultureSlotUpdateWithoutPlotInput.schema';
import { AgricultureSlotUncheckedUpdateWithoutPlotInputObjectSchema as AgricultureSlotUncheckedUpdateWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedUpdateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureSlotUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedUpdateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureSlotUpdateWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpdateWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateWithWhereUniqueWithoutPlotInput>;
export const AgricultureSlotUpdateWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

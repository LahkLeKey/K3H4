import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithoutPlotInputObjectSchema as AgricultureTaskUpdateWithoutPlotInputObjectSchema } from './AgricultureTaskUpdateWithoutPlotInput.schema';
import { AgricultureTaskUncheckedUpdateWithoutPlotInputObjectSchema as AgricultureTaskUncheckedUpdateWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedUpdateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureTaskUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureTaskUpdateWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateWithWhereUniqueWithoutPlotInput>;
export const AgricultureTaskUpdateWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithoutPlotInputObjectSchema as AgricultureTaskUpdateWithoutPlotInputObjectSchema } from './AgricultureTaskUpdateWithoutPlotInput.schema';
import { AgricultureTaskUncheckedUpdateWithoutPlotInputObjectSchema as AgricultureTaskUncheckedUpdateWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedUpdateWithoutPlotInput.schema';
import { AgricultureTaskCreateWithoutPlotInputObjectSchema as AgricultureTaskCreateWithoutPlotInputObjectSchema } from './AgricultureTaskCreateWithoutPlotInput.schema';
import { AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema as AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureTaskUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateWithoutPlotInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureTaskUpsertWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpsertWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpsertWithWhereUniqueWithoutPlotInput>;
export const AgricultureTaskUpsertWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

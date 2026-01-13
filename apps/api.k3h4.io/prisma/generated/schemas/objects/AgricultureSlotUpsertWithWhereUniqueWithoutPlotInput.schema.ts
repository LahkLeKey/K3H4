import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotUpdateWithoutPlotInputObjectSchema as AgricultureSlotUpdateWithoutPlotInputObjectSchema } from './AgricultureSlotUpdateWithoutPlotInput.schema';
import { AgricultureSlotUncheckedUpdateWithoutPlotInputObjectSchema as AgricultureSlotUncheckedUpdateWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedUpdateWithoutPlotInput.schema';
import { AgricultureSlotCreateWithoutPlotInputObjectSchema as AgricultureSlotCreateWithoutPlotInputObjectSchema } from './AgricultureSlotCreateWithoutPlotInput.schema';
import { AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema as AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureSlotUpdateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedUpdateWithoutPlotInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureSlotUpsertWithWhereUniqueWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpsertWithWhereUniqueWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpsertWithWhereUniqueWithoutPlotInput>;
export const AgricultureSlotUpsertWithWhereUniqueWithoutPlotInputObjectZodSchema = makeSchema();

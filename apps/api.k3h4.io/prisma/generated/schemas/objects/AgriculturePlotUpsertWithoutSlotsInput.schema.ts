import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotUpdateWithoutSlotsInputObjectSchema as AgriculturePlotUpdateWithoutSlotsInputObjectSchema } from './AgriculturePlotUpdateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutSlotsInput.schema';
import { AgriculturePlotCreateWithoutSlotsInputObjectSchema as AgriculturePlotCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutSlotsInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgriculturePlotUpdateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema)]),
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotUpsertWithoutSlotsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpsertWithoutSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpsertWithoutSlotsInput>;
export const AgriculturePlotUpsertWithoutSlotsInputObjectZodSchema = makeSchema();

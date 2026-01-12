import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotUpdateWithoutConditionsInputObjectSchema as AgriculturePlotUpdateWithoutConditionsInputObjectSchema } from './AgriculturePlotUpdateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutConditionsInput.schema';
import { AgriculturePlotCreateWithoutConditionsInputObjectSchema as AgriculturePlotCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotCreateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutConditionsInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgriculturePlotUpdateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema)]),
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema)]),
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotUpsertWithoutConditionsInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpsertWithoutConditionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpsertWithoutConditionsInput>;
export const AgriculturePlotUpsertWithoutConditionsInputObjectZodSchema = makeSchema();

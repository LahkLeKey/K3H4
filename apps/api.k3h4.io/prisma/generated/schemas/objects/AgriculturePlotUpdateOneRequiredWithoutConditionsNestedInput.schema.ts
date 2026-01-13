import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutConditionsInputObjectSchema as AgriculturePlotCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotCreateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutConditionsInput.schema';
import { AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema as AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutConditionsInput.schema';
import { AgriculturePlotUpsertWithoutConditionsInputObjectSchema as AgriculturePlotUpsertWithoutConditionsInputObjectSchema } from './AgriculturePlotUpsertWithoutConditionsInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateToOneWithWhereWithoutConditionsInputObjectSchema as AgriculturePlotUpdateToOneWithWhereWithoutConditionsInputObjectSchema } from './AgriculturePlotUpdateToOneWithWhereWithoutConditionsInput.schema';
import { AgriculturePlotUpdateWithoutConditionsInputObjectSchema as AgriculturePlotUpdateWithoutConditionsInputObjectSchema } from './AgriculturePlotUpdateWithoutConditionsInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutConditionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutConditionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutConditionsInputObjectSchema).optional(),
  upsert: z.lazy(() => AgriculturePlotUpsertWithoutConditionsInputObjectSchema).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgriculturePlotUpdateToOneWithWhereWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUpdateWithoutConditionsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutConditionsInputObjectSchema)]).optional()
}).strict();
export const AgriculturePlotUpdateOneRequiredWithoutConditionsNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateOneRequiredWithoutConditionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateOneRequiredWithoutConditionsNestedInput>;
export const AgriculturePlotUpdateOneRequiredWithoutConditionsNestedInputObjectZodSchema = makeSchema();

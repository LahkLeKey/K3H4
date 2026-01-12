import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutSlotsInputObjectSchema as AgriculturePlotCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutSlotsInput.schema';
import { AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema as AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutSlotsInput.schema';
import { AgriculturePlotUpsertWithoutSlotsInputObjectSchema as AgriculturePlotUpsertWithoutSlotsInputObjectSchema } from './AgriculturePlotUpsertWithoutSlotsInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateToOneWithWhereWithoutSlotsInputObjectSchema as AgriculturePlotUpdateToOneWithWhereWithoutSlotsInputObjectSchema } from './AgriculturePlotUpdateToOneWithWhereWithoutSlotsInput.schema';
import { AgriculturePlotUpdateWithoutSlotsInputObjectSchema as AgriculturePlotUpdateWithoutSlotsInputObjectSchema } from './AgriculturePlotUpdateWithoutSlotsInput.schema';
import { AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema as AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema } from './AgriculturePlotUncheckedUpdateWithoutSlotsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutSlotsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgriculturePlotCreateOrConnectWithoutSlotsInputObjectSchema).optional(),
  upsert: z.lazy(() => AgriculturePlotUpsertWithoutSlotsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgriculturePlotUpdateToOneWithWhereWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUpdateWithoutSlotsInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedUpdateWithoutSlotsInputObjectSchema)]).optional()
}).strict();
export const AgriculturePlotUpdateOneWithoutSlotsNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateOneWithoutSlotsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateOneWithoutSlotsNestedInput>;
export const AgriculturePlotUpdateOneWithoutSlotsNestedInputObjectZodSchema = makeSchema();

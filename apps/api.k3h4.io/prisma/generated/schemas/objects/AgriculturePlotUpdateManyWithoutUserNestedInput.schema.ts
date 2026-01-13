import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutUserInputObjectSchema as AgriculturePlotCreateWithoutUserInputObjectSchema } from './AgriculturePlotCreateWithoutUserInput.schema';
import { AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutUserInput.schema';
import { AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema as AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutUserInput.schema';
import { AgriculturePlotUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgriculturePlotUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgriculturePlotUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgriculturePlotCreateManyUserInputEnvelopeObjectSchema as AgriculturePlotCreateManyUserInputEnvelopeObjectSchema } from './AgriculturePlotCreateManyUserInputEnvelope.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgriculturePlotUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgriculturePlotUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgriculturePlotUpdateManyWithWhereWithoutUserInputObjectSchema as AgriculturePlotUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgriculturePlotUpdateManyWithWhereWithoutUserInput.schema';
import { AgriculturePlotScalarWhereInputObjectSchema as AgriculturePlotScalarWhereInputObjectSchema } from './AgriculturePlotScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgriculturePlotUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgriculturePlotCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgriculturePlotUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgriculturePlotUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema), z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgriculturePlotUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateManyWithoutUserNestedInput>;
export const AgriculturePlotUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

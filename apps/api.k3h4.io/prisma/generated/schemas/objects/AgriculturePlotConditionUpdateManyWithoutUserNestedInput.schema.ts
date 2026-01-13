import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionCreateWithoutUserInputObjectSchema as AgriculturePlotConditionCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutUserInput.schema';
import { AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema as AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateOrConnectWithoutUserInput.schema';
import { AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema as AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema } from './AgriculturePlotConditionCreateManyUserInputEnvelope.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgriculturePlotConditionUpdateManyWithWhereWithoutUserInputObjectSchema as AgriculturePlotConditionUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgriculturePlotConditionUpdateManyWithWhereWithoutUserInput.schema';
import { AgriculturePlotConditionScalarWhereInputObjectSchema as AgriculturePlotConditionScalarWhereInputObjectSchema } from './AgriculturePlotConditionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgriculturePlotConditionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgriculturePlotConditionScalarWhereInputObjectSchema), z.lazy(() => AgriculturePlotConditionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgriculturePlotConditionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateManyWithoutUserNestedInput>;
export const AgriculturePlotConditionUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

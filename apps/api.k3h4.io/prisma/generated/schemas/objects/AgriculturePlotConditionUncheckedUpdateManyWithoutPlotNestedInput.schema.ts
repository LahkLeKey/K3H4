import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateWithoutPlotInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutPlotInput.schema';
import { AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateOrConnectWithoutPlotInput.schema';
import { AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInputObjectSchema as AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInput.schema';
import { AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema as AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema } from './AgriculturePlotConditionCreateManyPlotInputEnvelope.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInputObjectSchema as AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInput.schema';
import { AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInputObjectSchema as AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInput.schema';
import { AgriculturePlotConditionScalarWhereInputObjectSchema as AgriculturePlotConditionScalarWhereInputObjectSchema } from './AgriculturePlotConditionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUpsertWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUpdateWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUpdateManyWithWhereWithoutPlotInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgriculturePlotConditionScalarWhereInputObjectSchema), z.lazy(() => AgriculturePlotConditionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgriculturePlotConditionUncheckedUpdateManyWithoutPlotNestedInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionUncheckedUpdateManyWithoutPlotNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUncheckedUpdateManyWithoutPlotNestedInput>;
export const AgriculturePlotConditionUncheckedUpdateManyWithoutPlotNestedInputObjectZodSchema = makeSchema();

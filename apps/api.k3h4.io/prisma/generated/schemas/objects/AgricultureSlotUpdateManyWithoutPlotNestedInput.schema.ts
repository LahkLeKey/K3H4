import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotCreateWithoutPlotInputObjectSchema as AgricultureSlotCreateWithoutPlotInputObjectSchema } from './AgricultureSlotCreateWithoutPlotInput.schema';
import { AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema as AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutPlotInput.schema';
import { AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema as AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema } from './AgricultureSlotCreateOrConnectWithoutPlotInput.schema';
import { AgricultureSlotUpsertWithWhereUniqueWithoutPlotInputObjectSchema as AgricultureSlotUpsertWithWhereUniqueWithoutPlotInputObjectSchema } from './AgricultureSlotUpsertWithWhereUniqueWithoutPlotInput.schema';
import { AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema as AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema } from './AgricultureSlotCreateManyPlotInputEnvelope.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotUpdateWithWhereUniqueWithoutPlotInputObjectSchema as AgricultureSlotUpdateWithWhereUniqueWithoutPlotInputObjectSchema } from './AgricultureSlotUpdateWithWhereUniqueWithoutPlotInput.schema';
import { AgricultureSlotUpdateManyWithWhereWithoutPlotInputObjectSchema as AgricultureSlotUpdateManyWithWhereWithoutPlotInputObjectSchema } from './AgricultureSlotUpdateManyWithWhereWithoutPlotInput.schema';
import { AgricultureSlotScalarWhereInputObjectSchema as AgricultureSlotScalarWhereInputObjectSchema } from './AgricultureSlotScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureSlotUpsertWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUpsertWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureSlotUpdateWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUpdateWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureSlotUpdateManyWithWhereWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUpdateManyWithWhereWithoutPlotInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema), z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureSlotUpdateManyWithoutPlotNestedInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpdateManyWithoutPlotNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateManyWithoutPlotNestedInput>;
export const AgricultureSlotUpdateManyWithoutPlotNestedInputObjectZodSchema = makeSchema();

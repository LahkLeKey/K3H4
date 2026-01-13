import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventCreateWithoutUserInputObjectSchema as TelemetryEventCreateWithoutUserInputObjectSchema } from './TelemetryEventCreateWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateWithoutUserInput.schema';
import { TelemetryEventCreateOrConnectWithoutUserInputObjectSchema as TelemetryEventCreateOrConnectWithoutUserInputObjectSchema } from './TelemetryEventCreateOrConnectWithoutUserInput.schema';
import { TelemetryEventUpsertWithWhereUniqueWithoutUserInputObjectSchema as TelemetryEventUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './TelemetryEventUpsertWithWhereUniqueWithoutUserInput.schema';
import { TelemetryEventCreateManyUserInputEnvelopeObjectSchema as TelemetryEventCreateManyUserInputEnvelopeObjectSchema } from './TelemetryEventCreateManyUserInputEnvelope.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventUpdateWithWhereUniqueWithoutUserInputObjectSchema as TelemetryEventUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './TelemetryEventUpdateWithWhereUniqueWithoutUserInput.schema';
import { TelemetryEventUpdateManyWithWhereWithoutUserInputObjectSchema as TelemetryEventUpdateManyWithWhereWithoutUserInputObjectSchema } from './TelemetryEventUpdateManyWithWhereWithoutUserInput.schema';
import { TelemetryEventScalarWhereInputObjectSchema as TelemetryEventScalarWhereInputObjectSchema } from './TelemetryEventScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TelemetryEventCreateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventCreateWithoutUserInputObjectSchema).array(), z.lazy(() => TelemetryEventUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TelemetryEventCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TelemetryEventUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TelemetryEventCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema), z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema), z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema), z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema), z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TelemetryEventUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TelemetryEventUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TelemetryEventScalarWhereInputObjectSchema), z.lazy(() => TelemetryEventScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TelemetryEventUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.TelemetryEventUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventUncheckedUpdateManyWithoutUserNestedInput>;
export const TelemetryEventUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

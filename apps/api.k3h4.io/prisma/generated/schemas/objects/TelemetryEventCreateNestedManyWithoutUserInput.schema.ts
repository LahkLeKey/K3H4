import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventCreateWithoutUserInputObjectSchema as TelemetryEventCreateWithoutUserInputObjectSchema } from './TelemetryEventCreateWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateWithoutUserInput.schema';
import { TelemetryEventCreateOrConnectWithoutUserInputObjectSchema as TelemetryEventCreateOrConnectWithoutUserInputObjectSchema } from './TelemetryEventCreateOrConnectWithoutUserInput.schema';
import { TelemetryEventCreateManyUserInputEnvelopeObjectSchema as TelemetryEventCreateManyUserInputEnvelopeObjectSchema } from './TelemetryEventCreateManyUserInputEnvelope.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './TelemetryEventWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TelemetryEventCreateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventCreateWithoutUserInputObjectSchema).array(), z.lazy(() => TelemetryEventUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TelemetryEventCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TelemetryEventCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema), z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TelemetryEventCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCreateNestedManyWithoutUserInput>;
export const TelemetryEventCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();

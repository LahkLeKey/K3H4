import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventCreateWithoutUserInputObjectSchema as TelemetryEventCreateWithoutUserInputObjectSchema } from './TelemetryEventCreateWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TelemetryEventCreateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const TelemetryEventCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCreateOrConnectWithoutUserInput>;
export const TelemetryEventCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

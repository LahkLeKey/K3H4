import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventUpdateWithoutUserInputObjectSchema as TelemetryEventUpdateWithoutUserInputObjectSchema } from './TelemetryEventUpdateWithoutUserInput.schema';
import { TelemetryEventUncheckedUpdateWithoutUserInputObjectSchema as TelemetryEventUncheckedUpdateWithoutUserInputObjectSchema } from './TelemetryEventUncheckedUpdateWithoutUserInput.schema';
import { TelemetryEventCreateWithoutUserInputObjectSchema as TelemetryEventCreateWithoutUserInputObjectSchema } from './TelemetryEventCreateWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TelemetryEventUpdateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => TelemetryEventCreateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const TelemetryEventUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventUpsertWithWhereUniqueWithoutUserInput>;
export const TelemetryEventUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

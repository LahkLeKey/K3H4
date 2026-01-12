import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventUpdateWithoutUserInputObjectSchema as TelemetryEventUpdateWithoutUserInputObjectSchema } from './TelemetryEventUpdateWithoutUserInput.schema';
import { TelemetryEventUncheckedUpdateWithoutUserInputObjectSchema as TelemetryEventUncheckedUpdateWithoutUserInputObjectSchema } from './TelemetryEventUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TelemetryEventWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TelemetryEventUpdateWithoutUserInputObjectSchema), z.lazy(() => TelemetryEventUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const TelemetryEventUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventUpdateWithWhereUniqueWithoutUserInput>;
export const TelemetryEventUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

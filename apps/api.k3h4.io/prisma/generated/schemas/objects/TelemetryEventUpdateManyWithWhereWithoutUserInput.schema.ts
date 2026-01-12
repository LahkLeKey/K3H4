import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventScalarWhereInputObjectSchema as TelemetryEventScalarWhereInputObjectSchema } from './TelemetryEventScalarWhereInput.schema';
import { TelemetryEventUpdateManyMutationInputObjectSchema as TelemetryEventUpdateManyMutationInputObjectSchema } from './TelemetryEventUpdateManyMutationInput.schema';
import { TelemetryEventUncheckedUpdateManyWithoutUserInputObjectSchema as TelemetryEventUncheckedUpdateManyWithoutUserInputObjectSchema } from './TelemetryEventUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TelemetryEventScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TelemetryEventUpdateManyMutationInputObjectSchema), z.lazy(() => TelemetryEventUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const TelemetryEventUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventUpdateManyWithWhereWithoutUserInput>;
export const TelemetryEventUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventCreateManyUserInputObjectSchema as TelemetryEventCreateManyUserInputObjectSchema } from './TelemetryEventCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TelemetryEventCreateManyUserInputObjectSchema), z.lazy(() => TelemetryEventCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TelemetryEventCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.TelemetryEventCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCreateManyUserInputEnvelope>;
export const TelemetryEventCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();

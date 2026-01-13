import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  sessionId: z.string(),
  eventType: z.string(),
  source: z.string(),
  path: z.string().optional().nullable(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const TelemetryEventUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventUncheckedCreateWithoutUserInput>;
export const TelemetryEventUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

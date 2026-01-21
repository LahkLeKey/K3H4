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
  durationMs: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const TelemetryEventCreateManyUserInputObjectSchema: z.ZodType<Prisma.TelemetryEventCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCreateManyUserInput>;
export const TelemetryEventCreateManyUserInputObjectZodSchema = makeSchema();

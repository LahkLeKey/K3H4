import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  sessionId: z.string(),
  eventType: z.string(),
  source: z.string(),
  path: z.string().optional().nullable(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  durationMs: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const TelemetryEventUncheckedCreateInputObjectSchema: z.ZodType<Prisma.TelemetryEventUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventUncheckedCreateInput>;
export const TelemetryEventUncheckedCreateInputObjectZodSchema = makeSchema();

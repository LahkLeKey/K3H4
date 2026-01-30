import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutTelemetryInputObjectSchema as UserCreateNestedOneWithoutTelemetryInputObjectSchema } from './UserCreateNestedOneWithoutTelemetryInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  sessionId: z.string(),
  eventType: z.string(),
  source: z.string(),
  path: z.string().optional().nullable(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  durationMs: z.number().int().optional().nullable(),
  error: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTelemetryInputObjectSchema).optional()
}).strict();
export const TelemetryEventCreateInputObjectSchema: z.ZodType<Prisma.TelemetryEventCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventCreateInput>;
export const TelemetryEventCreateInputObjectZodSchema = makeSchema();

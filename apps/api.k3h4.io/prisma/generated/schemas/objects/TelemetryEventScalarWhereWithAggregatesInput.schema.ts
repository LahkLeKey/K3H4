import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const telemetryeventscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => TelemetryEventScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TelemetryEventScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TelemetryEventScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TelemetryEventScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TelemetryEventScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  sessionId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  eventType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  source: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const TelemetryEventScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.TelemetryEventScalarWhereWithAggregatesInput> = telemetryeventscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.TelemetryEventScalarWhereWithAggregatesInput>;
export const TelemetryEventScalarWhereWithAggregatesInputObjectZodSchema = telemetryeventscalarwherewithaggregatesinputSchema;

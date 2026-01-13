import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const telemetryeventscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TelemetryEventScalarWhereInputObjectSchema), z.lazy(() => TelemetryEventScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TelemetryEventScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TelemetryEventScalarWhereInputObjectSchema), z.lazy(() => TelemetryEventScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  sessionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  eventType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const TelemetryEventScalarWhereInputObjectSchema: z.ZodType<Prisma.TelemetryEventScalarWhereInput> = telemetryeventscalarwhereinputSchema as unknown as z.ZodType<Prisma.TelemetryEventScalarWhereInput>;
export const TelemetryEventScalarWhereInputObjectZodSchema = telemetryeventscalarwhereinputSchema;

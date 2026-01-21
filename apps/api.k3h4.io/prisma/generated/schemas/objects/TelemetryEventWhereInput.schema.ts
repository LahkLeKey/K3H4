import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const telemetryeventwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TelemetryEventWhereInputObjectSchema), z.lazy(() => TelemetryEventWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TelemetryEventWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TelemetryEventWhereInputObjectSchema), z.lazy(() => TelemetryEventWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  sessionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  eventType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  durationMs: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const TelemetryEventWhereInputObjectSchema: z.ZodType<Prisma.TelemetryEventWhereInput> = telemetryeventwhereinputSchema as unknown as z.ZodType<Prisma.TelemetryEventWhereInput>;
export const TelemetryEventWhereInputObjectZodSchema = telemetryeventwhereinputSchema;

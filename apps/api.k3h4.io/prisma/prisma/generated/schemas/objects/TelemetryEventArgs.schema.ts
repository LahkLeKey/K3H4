import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './TelemetryEventSelect.schema';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './TelemetryEventInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TelemetryEventSelectObjectSchema).optional(),
  include: z.lazy(() => TelemetryEventIncludeObjectSchema).optional()
}).strict();
export const TelemetryEventArgsObjectSchema = makeSchema();
export const TelemetryEventArgsObjectZodSchema = makeSchema();

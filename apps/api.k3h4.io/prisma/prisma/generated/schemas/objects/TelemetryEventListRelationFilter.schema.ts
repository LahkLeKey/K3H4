import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './TelemetryEventWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => TelemetryEventWhereInputObjectSchema).optional(),
  some: z.lazy(() => TelemetryEventWhereInputObjectSchema).optional(),
  none: z.lazy(() => TelemetryEventWhereInputObjectSchema).optional()
}).strict();
export const TelemetryEventListRelationFilterObjectSchema: z.ZodType<Prisma.TelemetryEventListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventListRelationFilter>;
export const TelemetryEventListRelationFilterObjectZodSchema = makeSchema();

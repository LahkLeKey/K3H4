import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './TelemetryEventWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TelemetryEventWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountTelemetryArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountTelemetryArgsObjectZodSchema = makeSchema();

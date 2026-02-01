import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountTelemetryArgsObjectSchema as UserCountOutputTypeCountTelemetryArgsObjectSchema } from './UserCountOutputTypeCountTelemetryArgs.schema';
import { UserCountOutputTypeCountActorsArgsObjectSchema as UserCountOutputTypeCountActorsArgsObjectSchema } from './UserCountOutputTypeCountActorsArgs.schema'

const makeSchema = () => z.object({
  telemetry: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTelemetryArgsObjectSchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountActorsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountTelemetryArgsObjectSchema as UserCountOutputTypeCountTelemetryArgsObjectSchema } from './UserCountOutputTypeCountTelemetryArgs.schema';
import { UserCountOutputTypeCountChatSessionsArgsObjectSchema as UserCountOutputTypeCountChatSessionsArgsObjectSchema } from './UserCountOutputTypeCountChatSessionsArgs.schema';
import { UserCountOutputTypeCountOllamaOperationsArgsObjectSchema as UserCountOutputTypeCountOllamaOperationsArgsObjectSchema } from './UserCountOutputTypeCountOllamaOperationsArgs.schema';
import { UserCountOutputTypeCountActorsArgsObjectSchema as UserCountOutputTypeCountActorsArgsObjectSchema } from './UserCountOutputTypeCountActorsArgs.schema'

const makeSchema = () => z.object({
  telemetry: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTelemetryArgsObjectSchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountChatSessionsArgsObjectSchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOllamaOperationsArgsObjectSchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountActorsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();

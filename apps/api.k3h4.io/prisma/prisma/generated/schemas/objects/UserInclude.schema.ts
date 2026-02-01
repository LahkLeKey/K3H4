import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventFindManySchema as TelemetryEventFindManySchema } from '../findManyTelemetryEvent.schema';
import { ChatSessionFindManySchema as ChatSessionFindManySchema } from '../findManyChatSession.schema';
import { ActorFindManySchema as ActorFindManySchema } from '../findManyActor.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  telemetry: z.union([z.boolean(), z.lazy(() => TelemetryEventFindManySchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => ChatSessionFindManySchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => ActorFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();

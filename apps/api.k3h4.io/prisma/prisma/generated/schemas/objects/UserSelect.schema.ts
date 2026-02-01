import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TelemetryEventFindManySchema as TelemetryEventFindManySchema } from '../findManyTelemetryEvent.schema';
import { ActorFindManySchema as ActorFindManySchema } from '../findManyActor.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerId: z.boolean().optional(),
  k3h4CoinBalance: z.boolean().optional(),
  displayName: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => TelemetryEventFindManySchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => ActorFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();

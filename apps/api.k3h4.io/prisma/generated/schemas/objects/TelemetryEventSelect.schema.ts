import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  sessionId: z.boolean().optional(),
  eventType: z.boolean().optional(),
  source: z.boolean().optional(),
  path: z.boolean().optional(),
  payload: z.boolean().optional(),
  durationMs: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const TelemetryEventSelectObjectSchema: z.ZodType<Prisma.TelemetryEventSelect> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventSelect>;
export const TelemetryEventSelectObjectZodSchema = makeSchema();

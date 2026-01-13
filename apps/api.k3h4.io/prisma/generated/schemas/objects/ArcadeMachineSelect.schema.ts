import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeMachineCountOutputTypeArgsObjectSchema as ArcadeMachineCountOutputTypeArgsObjectSchema } from './ArcadeMachineCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  gameTitle: z.boolean().optional(),
  status: z.boolean().optional(),
  location: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadeMachineCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadeMachineSelectObjectSchema: z.ZodType<Prisma.ArcadeMachineSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineSelect>;
export const ArcadeMachineSelectObjectZodSchema = makeSchema();

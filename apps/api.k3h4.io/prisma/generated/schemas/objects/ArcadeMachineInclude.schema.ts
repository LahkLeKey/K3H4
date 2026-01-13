import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeMachineCountOutputTypeArgsObjectSchema as ArcadeMachineCountOutputTypeArgsObjectSchema } from './ArcadeMachineCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadeMachineCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadeMachineIncludeObjectSchema: z.ZodType<Prisma.ArcadeMachineInclude> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineInclude>;
export const ArcadeMachineIncludeObjectZodSchema = makeSchema();

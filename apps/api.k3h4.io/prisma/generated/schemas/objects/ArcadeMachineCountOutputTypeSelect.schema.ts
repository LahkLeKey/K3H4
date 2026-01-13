import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCountOutputTypeCountSessionsArgsObjectSchema as ArcadeMachineCountOutputTypeCountSessionsArgsObjectSchema } from './ArcadeMachineCountOutputTypeCountSessionsArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeMachineCountOutputTypeCountSessionsArgsObjectSchema)]).optional()
}).strict();
export const ArcadeMachineCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ArcadeMachineCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCountOutputTypeSelect>;
export const ArcadeMachineCountOutputTypeSelectObjectZodSchema = makeSchema();

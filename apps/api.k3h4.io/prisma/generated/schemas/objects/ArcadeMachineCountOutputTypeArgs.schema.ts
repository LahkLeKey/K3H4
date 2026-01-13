import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCountOutputTypeSelectObjectSchema as ArcadeMachineCountOutputTypeSelectObjectSchema } from './ArcadeMachineCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeMachineCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ArcadeMachineCountOutputTypeArgsObjectSchema = makeSchema();
export const ArcadeMachineCountOutputTypeArgsObjectZodSchema = makeSchema();

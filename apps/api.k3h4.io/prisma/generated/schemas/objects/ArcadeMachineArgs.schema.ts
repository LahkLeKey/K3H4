import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineSelectObjectSchema as ArcadeMachineSelectObjectSchema } from './ArcadeMachineSelect.schema';
import { ArcadeMachineIncludeObjectSchema as ArcadeMachineIncludeObjectSchema } from './ArcadeMachineInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeMachineSelectObjectSchema).optional(),
  include: z.lazy(() => ArcadeMachineIncludeObjectSchema).optional()
}).strict();
export const ArcadeMachineArgsObjectSchema = makeSchema();
export const ArcadeMachineArgsObjectZodSchema = makeSchema();

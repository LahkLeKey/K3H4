import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCountOutputTypeSelectObjectSchema as AssignmentCountOutputTypeSelectObjectSchema } from './AssignmentCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AssignmentCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AssignmentCountOutputTypeArgsObjectSchema = makeSchema();
export const AssignmentCountOutputTypeArgsObjectZodSchema = makeSchema();

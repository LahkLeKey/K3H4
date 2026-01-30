import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './UserPreferenceSelect.schema';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './UserPreferenceInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UserPreferenceSelectObjectSchema).optional(),
  include: z.lazy(() => UserPreferenceIncludeObjectSchema).optional()
}).strict();
export const UserPreferenceArgsObjectSchema = makeSchema();
export const UserPreferenceArgsObjectZodSchema = makeSchema();

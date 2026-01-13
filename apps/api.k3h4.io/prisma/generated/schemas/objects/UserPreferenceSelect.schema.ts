import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  theme: z.boolean().optional(),
  locale: z.boolean().optional(),
  timezone: z.boolean().optional(),
  marketingOptIn: z.boolean().optional(),
  note: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const UserPreferenceSelectObjectSchema: z.ZodType<Prisma.UserPreferenceSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceSelect>;
export const UserPreferenceSelectObjectZodSchema = makeSchema();

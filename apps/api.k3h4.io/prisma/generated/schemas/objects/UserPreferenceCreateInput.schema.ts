import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutPreferenceInputObjectSchema as UserCreateNestedOneWithoutPreferenceInputObjectSchema } from './UserCreateNestedOneWithoutPreferenceInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  theme: z.string().optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPreferenceInputObjectSchema)
}).strict();
export const UserPreferenceCreateInputObjectSchema: z.ZodType<Prisma.UserPreferenceCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceCreateInput>;
export const UserPreferenceCreateInputObjectZodSchema = makeSchema();

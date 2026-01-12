import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  theme: z.string().optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const UserPreferenceCreateManyInputObjectSchema: z.ZodType<Prisma.UserPreferenceCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceCreateManyInput>;
export const UserPreferenceCreateManyInputObjectZodSchema = makeSchema();

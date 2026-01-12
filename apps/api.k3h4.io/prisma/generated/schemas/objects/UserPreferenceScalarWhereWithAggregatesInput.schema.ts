import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const userpreferencescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UserPreferenceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UserPreferenceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserPreferenceScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserPreferenceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UserPreferenceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  theme: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  locale: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  timezone: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  marketingOptIn: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UserPreferenceScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserPreferenceScalarWhereWithAggregatesInput> = userpreferencescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserPreferenceScalarWhereWithAggregatesInput>;
export const UserPreferenceScalarWhereWithAggregatesInputObjectZodSchema = userpreferencescalarwherewithaggregatesinputSchema;

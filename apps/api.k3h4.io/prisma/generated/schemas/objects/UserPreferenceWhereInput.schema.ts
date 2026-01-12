import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const userpreferencewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserPreferenceWhereInputObjectSchema), z.lazy(() => UserPreferenceWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserPreferenceWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserPreferenceWhereInputObjectSchema), z.lazy(() => UserPreferenceWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  theme: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  locale: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  timezone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  marketingOptIn: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const UserPreferenceWhereInputObjectSchema: z.ZodType<Prisma.UserPreferenceWhereInput> = userpreferencewhereinputSchema as unknown as z.ZodType<Prisma.UserPreferenceWhereInput>;
export const UserPreferenceWhereInputObjectZodSchema = userpreferencewhereinputSchema;

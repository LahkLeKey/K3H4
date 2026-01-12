import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const providergrantwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProviderGrantWhereInputObjectSchema), z.lazy(() => ProviderGrantWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProviderGrantWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProviderGrantWhereInputObjectSchema), z.lazy(() => ProviderGrantWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  providerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  accessToken: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const ProviderGrantWhereInputObjectSchema: z.ZodType<Prisma.ProviderGrantWhereInput> = providergrantwhereinputSchema as unknown as z.ZodType<Prisma.ProviderGrantWhereInput>;
export const ProviderGrantWhereInputObjectZodSchema = providergrantwhereinputSchema;

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const refreshtokenwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RefreshTokenWhereInputObjectSchema), z.lazy(() => RefreshTokenWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RefreshTokenWhereInputObjectSchema), z.lazy(() => RefreshTokenWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const RefreshTokenWhereInputObjectSchema: z.ZodType<Prisma.RefreshTokenWhereInput> = refreshtokenwhereinputSchema as unknown as z.ZodType<Prisma.RefreshTokenWhereInput>;
export const RefreshTokenWhereInputObjectZodSchema = refreshtokenwhereinputSchema;

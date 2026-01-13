import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const refreshtokenscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RefreshTokenScalarWhereInputObjectSchema), z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RefreshTokenScalarWhereInputObjectSchema), z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RefreshTokenScalarWhereInputObjectSchema: z.ZodType<Prisma.RefreshTokenScalarWhereInput> = refreshtokenscalarwhereinputSchema as unknown as z.ZodType<Prisma.RefreshTokenScalarWhereInput>;
export const RefreshTokenScalarWhereInputObjectZodSchema = refreshtokenscalarwhereinputSchema;

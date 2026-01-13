import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const refreshtokenscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RefreshTokenScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RefreshTokenScalarWhereWithAggregatesInput> = refreshtokenscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RefreshTokenScalarWhereWithAggregatesInput>;
export const RefreshTokenScalarWhereWithAggregatesInputObjectZodSchema = refreshtokenscalarwherewithaggregatesinputSchema;

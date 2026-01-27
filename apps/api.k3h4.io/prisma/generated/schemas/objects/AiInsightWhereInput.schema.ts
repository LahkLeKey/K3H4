import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const aiinsightwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AiInsightWhereInputObjectSchema), z.lazy(() => AiInsightWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AiInsightWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AiInsightWhereInputObjectSchema), z.lazy(() => AiInsightWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  targetType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetLabel: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const AiInsightWhereInputObjectSchema: z.ZodType<Prisma.AiInsightWhereInput> = aiinsightwhereinputSchema as unknown as z.ZodType<Prisma.AiInsightWhereInput>;
export const AiInsightWhereInputObjectZodSchema = aiinsightwhereinputSchema;

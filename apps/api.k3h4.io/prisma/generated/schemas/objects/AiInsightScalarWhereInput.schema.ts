import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const aiinsightscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AiInsightScalarWhereInputObjectSchema), z.lazy(() => AiInsightScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AiInsightScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AiInsightScalarWhereInputObjectSchema), z.lazy(() => AiInsightScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  targetType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetLabel: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AiInsightScalarWhereInputObjectSchema: z.ZodType<Prisma.AiInsightScalarWhereInput> = aiinsightscalarwhereinputSchema as unknown as z.ZodType<Prisma.AiInsightScalarWhereInput>;
export const AiInsightScalarWhereInputObjectZodSchema = aiinsightscalarwhereinputSchema;

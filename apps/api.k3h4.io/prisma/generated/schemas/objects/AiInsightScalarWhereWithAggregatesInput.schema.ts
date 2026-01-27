import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const aiinsightscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AiInsightScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AiInsightScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AiInsightScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AiInsightScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AiInsightScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  targetType: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  targetLabel: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AiInsightScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AiInsightScalarWhereWithAggregatesInput> = aiinsightscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AiInsightScalarWhereWithAggregatesInput>;
export const AiInsightScalarWhereWithAggregatesInputObjectZodSchema = aiinsightscalarwherewithaggregatesinputSchema;

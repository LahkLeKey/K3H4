import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ChatSessionNullableScalarRelationFilterObjectSchema as ChatSessionNullableScalarRelationFilterObjectSchema } from './ChatSessionNullableScalarRelationFilter.schema';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const ollamaoperationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OllamaOperationWhereInputObjectSchema), z.lazy(() => OllamaOperationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OllamaOperationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OllamaOperationWhereInputObjectSchema), z.lazy(() => OllamaOperationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sessionId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  model: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  temperature: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  systemPrompt: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  requestBody: z.lazy(() => JsonFilterObjectSchema).optional(),
  responseBody: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  statusCode: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  errorMessage: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  session: z.union([z.lazy(() => ChatSessionNullableScalarRelationFilterObjectSchema), z.lazy(() => ChatSessionWhereInputObjectSchema)]).optional()
}).strict();
export const OllamaOperationWhereInputObjectSchema: z.ZodType<Prisma.OllamaOperationWhereInput> = ollamaoperationwhereinputSchema as unknown as z.ZodType<Prisma.OllamaOperationWhereInput>;
export const OllamaOperationWhereInputObjectZodSchema = ollamaoperationwhereinputSchema;

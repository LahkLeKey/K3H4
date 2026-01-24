import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const chatsessionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatSessionScalarWhereInputObjectSchema), z.lazy(() => ChatSessionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatSessionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatSessionScalarWhereInputObjectSchema), z.lazy(() => ChatSessionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  systemPrompt: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  model: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  temperature: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ChatSessionScalarWhereInputObjectSchema: z.ZodType<Prisma.ChatSessionScalarWhereInput> = chatsessionscalarwhereinputSchema as unknown as z.ZodType<Prisma.ChatSessionScalarWhereInput>;
export const ChatSessionScalarWhereInputObjectZodSchema = chatsessionscalarwhereinputSchema;

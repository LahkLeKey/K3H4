import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const agriculturetaskscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema), z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema), z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plotId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  cropPlanId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  assignee: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  priority: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  tags: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  dueDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureTaskScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureTaskScalarWhereInput> = agriculturetaskscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureTaskScalarWhereInput>;
export const AgricultureTaskScalarWhereInputObjectZodSchema = agriculturetaskscalarwhereinputSchema;

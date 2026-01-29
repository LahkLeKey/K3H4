import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const actorscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ActorScalarWhereInputObjectSchema), z.lazy(() => ActorScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ActorScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ActorScalarWhereInputObjectSchema), z.lazy(() => ActorScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  label: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ActorScalarWhereInputObjectSchema: z.ZodType<Prisma.ActorScalarWhereInput> = actorscalarwhereinputSchema as unknown as z.ZodType<Prisma.ActorScalarWhereInput>;
export const ActorScalarWhereInputObjectZodSchema = actorscalarwhereinputSchema;

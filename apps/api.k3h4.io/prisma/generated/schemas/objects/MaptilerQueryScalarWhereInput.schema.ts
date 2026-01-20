import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const maptilerqueryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema), z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema), z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  lastUsedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MaptilerQueryScalarWhereInputObjectSchema: z.ZodType<Prisma.MaptilerQueryScalarWhereInput> = maptilerqueryscalarwhereinputSchema as unknown as z.ZodType<Prisma.MaptilerQueryScalarWhereInput>;
export const MaptilerQueryScalarWhereInputObjectZodSchema = maptilerqueryscalarwhereinputSchema;

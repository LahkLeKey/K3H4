import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const culinarysupplierneedscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema), z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema), z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  item: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dueDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CulinarySupplierNeedScalarWhereInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedScalarWhereInput> = culinarysupplierneedscalarwhereinputSchema as unknown as z.ZodType<Prisma.CulinarySupplierNeedScalarWhereInput>;
export const CulinarySupplierNeedScalarWhereInputObjectZodSchema = culinarysupplierneedscalarwhereinputSchema;

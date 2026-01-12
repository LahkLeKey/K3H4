import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const culinarysupplierneedscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinarySupplierNeedScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CulinarySupplierNeedScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinarySupplierNeedScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinarySupplierNeedScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CulinarySupplierNeedScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  item: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dueDate: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CulinarySupplierNeedScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedScalarWhereWithAggregatesInput> = culinarysupplierneedscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CulinarySupplierNeedScalarWhereWithAggregatesInput>;
export const CulinarySupplierNeedScalarWhereWithAggregatesInputObjectZodSchema = culinarysupplierneedscalarwherewithaggregatesinputSchema;

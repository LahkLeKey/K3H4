import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const agricultureshipmentscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema), z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema), z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lot: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  destination: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  mode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  eta: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  freightLoadId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureShipmentScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentScalarWhereInput> = agricultureshipmentscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureShipmentScalarWhereInput>;
export const AgricultureShipmentScalarWhereInputObjectZodSchema = agricultureshipmentscalarwhereinputSchema;

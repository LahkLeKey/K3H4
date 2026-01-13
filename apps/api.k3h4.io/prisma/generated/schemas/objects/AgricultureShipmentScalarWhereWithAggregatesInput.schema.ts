import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const agricultureshipmentscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureShipmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureShipmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureShipmentScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureShipmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureShipmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  lot: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  destination: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  mode: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  eta: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  freightLoadId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureShipmentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentScalarWhereWithAggregatesInput> = agricultureshipmentscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AgricultureShipmentScalarWhereWithAggregatesInput>;
export const AgricultureShipmentScalarWhereWithAggregatesInputObjectZodSchema = agricultureshipmentscalarwherewithaggregatesinputSchema;

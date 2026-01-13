import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const arcaderedemptionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeRedemptionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeRedemptionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeRedemptionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  prizeId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  fulfilledAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeRedemptionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionScalarWhereWithAggregatesInput> = arcaderedemptionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ArcadeRedemptionScalarWhereWithAggregatesInput>;
export const ArcadeRedemptionScalarWhereWithAggregatesInputObjectZodSchema = arcaderedemptionscalarwherewithaggregatesinputSchema;

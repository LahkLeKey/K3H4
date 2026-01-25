import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { EnumLifecycleStatusWithAggregatesFilterObjectSchema as EnumLifecycleStatusWithAggregatesFilterObjectSchema } from './EnumLifecycleStatusWithAggregatesFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const posticketscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PosTicketScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PosTicketScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosTicketScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosTicketScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PosTicketScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  storeId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  total: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  itemsCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  channel: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusWithAggregatesFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PosTicketScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PosTicketScalarWhereWithAggregatesInput> = posticketscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PosTicketScalarWhereWithAggregatesInput>;
export const PosTicketScalarWhereWithAggregatesInputObjectZodSchema = posticketscalarwherewithaggregatesinputSchema;

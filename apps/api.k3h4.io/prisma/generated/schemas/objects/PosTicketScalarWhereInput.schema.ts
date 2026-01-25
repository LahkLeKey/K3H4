import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const posticketscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PosTicketScalarWhereInputObjectSchema), z.lazy(() => PosTicketScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosTicketScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosTicketScalarWhereInputObjectSchema), z.lazy(() => PosTicketScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  storeId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  itemsCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  channel: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PosTicketScalarWhereInputObjectSchema: z.ZodType<Prisma.PosTicketScalarWhereInput> = posticketscalarwhereinputSchema as unknown as z.ZodType<Prisma.PosTicketScalarWhereInput>;
export const PosTicketScalarWhereInputObjectZodSchema = posticketscalarwhereinputSchema;

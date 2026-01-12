import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { PosStoreScalarRelationFilterObjectSchema as PosStoreScalarRelationFilterObjectSchema } from './PosStoreScalarRelationFilter.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './PosStoreWhereInput.schema';
import { PosLineItemListRelationFilterObjectSchema as PosLineItemListRelationFilterObjectSchema } from './PosLineItemListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const posticketwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PosTicketWhereInputObjectSchema), z.lazy(() => PosTicketWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosTicketWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosTicketWhereInputObjectSchema), z.lazy(() => PosTicketWhereInputObjectSchema).array()]).optional(),
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
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  store: z.union([z.lazy(() => PosStoreScalarRelationFilterObjectSchema), z.lazy(() => PosStoreWhereInputObjectSchema)]).optional(),
  lineItems: z.lazy(() => PosLineItemListRelationFilterObjectSchema).optional()
}).strict();
export const PosTicketWhereInputObjectSchema: z.ZodType<Prisma.PosTicketWhereInput> = posticketwhereinputSchema as unknown as z.ZodType<Prisma.PosTicketWhereInput>;
export const PosTicketWhereInputObjectZodSchema = posticketwhereinputSchema;

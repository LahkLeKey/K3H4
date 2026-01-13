import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ArcadeCardScalarRelationFilterObjectSchema as ArcadeCardScalarRelationFilterObjectSchema } from './ArcadeCardScalarRelationFilter.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadetopupwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeTopUpWhereInputObjectSchema), z.lazy(() => ArcadeTopUpWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeTopUpWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeTopUpWhereInputObjectSchema), z.lazy(() => ArcadeTopUpWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  card: z.union([z.lazy(() => ArcadeCardScalarRelationFilterObjectSchema), z.lazy(() => ArcadeCardWhereInputObjectSchema)]).optional()
}).strict();
export const ArcadeTopUpWhereInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpWhereInput> = arcadetopupwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeTopUpWhereInput>;
export const ArcadeTopUpWhereInputObjectZodSchema = arcadetopupwhereinputSchema;

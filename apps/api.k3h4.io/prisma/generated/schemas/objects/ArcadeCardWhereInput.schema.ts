import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ArcadeTopUpListRelationFilterObjectSchema as ArcadeTopUpListRelationFilterObjectSchema } from './ArcadeTopUpListRelationFilter.schema';
import { ArcadeSessionListRelationFilterObjectSchema as ArcadeSessionListRelationFilterObjectSchema } from './ArcadeSessionListRelationFilter.schema';
import { ArcadeRedemptionListRelationFilterObjectSchema as ArcadeRedemptionListRelationFilterObjectSchema } from './ArcadeRedemptionListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadecardwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeCardWhereInputObjectSchema), z.lazy(() => ArcadeCardWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeCardWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeCardWhereInputObjectSchema), z.lazy(() => ArcadeCardWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  label: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  balance: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balance' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  topUps: z.lazy(() => ArcadeTopUpListRelationFilterObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionListRelationFilterObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionListRelationFilterObjectSchema).optional()
}).strict();
export const ArcadeCardWhereInputObjectSchema: z.ZodType<Prisma.ArcadeCardWhereInput> = arcadecardwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeCardWhereInput>;
export const ArcadeCardWhereInputObjectZodSchema = arcadecardwhereinputSchema;

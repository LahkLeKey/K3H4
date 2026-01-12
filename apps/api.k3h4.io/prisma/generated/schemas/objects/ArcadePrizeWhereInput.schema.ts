import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ArcadeRedemptionListRelationFilterObjectSchema as ArcadeRedemptionListRelationFilterObjectSchema } from './ArcadeRedemptionListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadeprizewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadePrizeWhereInputObjectSchema), z.lazy(() => ArcadePrizeWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadePrizeWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadePrizeWhereInputObjectSchema), z.lazy(() => ArcadePrizeWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sku: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  costCoins: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costCoins' must be a Decimal",
})]).optional(),
  stock: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionListRelationFilterObjectSchema).optional()
}).strict();
export const ArcadePrizeWhereInputObjectSchema: z.ZodType<Prisma.ArcadePrizeWhereInput> = arcadeprizewhereinputSchema as unknown as z.ZodType<Prisma.ArcadePrizeWhereInput>;
export const ArcadePrizeWhereInputObjectZodSchema = arcadeprizewhereinputSchema;

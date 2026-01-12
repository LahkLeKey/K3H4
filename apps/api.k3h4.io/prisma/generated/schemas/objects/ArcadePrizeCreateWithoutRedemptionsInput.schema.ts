import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadePrizesInputObjectSchema as UserCreateNestedOneWithoutArcadePrizesInputObjectSchema } from './UserCreateNestedOneWithoutArcadePrizesInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  sku: z.string().optional().nullable(),
  costCoins: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costCoins' must be a Decimal",
}),
  stock: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadePrizesInputObjectSchema)
}).strict();
export const ArcadePrizeCreateWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateWithoutRedemptionsInput>;
export const ArcadePrizeCreateWithoutRedemptionsInputObjectZodSchema = makeSchema();

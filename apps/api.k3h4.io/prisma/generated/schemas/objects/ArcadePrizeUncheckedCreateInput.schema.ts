import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  redemptions: z.lazy(() => ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema).optional()
}).strict();
export const ArcadePrizeUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUncheckedCreateInput>;
export const ArcadePrizeUncheckedCreateInputObjectZodSchema = makeSchema();

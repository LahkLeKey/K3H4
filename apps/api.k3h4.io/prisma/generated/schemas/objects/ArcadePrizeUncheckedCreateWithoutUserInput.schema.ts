import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInput.schema'

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
  redemptions: z.lazy(() => ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema).optional()
}).strict();
export const ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUncheckedCreateWithoutUserInput>;
export const ArcadePrizeUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

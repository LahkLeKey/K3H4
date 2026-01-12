import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { ArcadeCardCreateNestedOneWithoutTopUpsInputObjectSchema as ArcadeCardCreateNestedOneWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateNestedOneWithoutTopUpsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  source: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  card: z.lazy(() => ArcadeCardCreateNestedOneWithoutTopUpsInputObjectSchema)
}).strict();
export const ArcadeTopUpCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateWithoutUserInput>;
export const ArcadeTopUpCreateWithoutUserInputObjectZodSchema = makeSchema();

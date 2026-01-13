import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema as UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeTopUpsInput.schema'

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
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema)
}).strict();
export const ArcadeTopUpCreateWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateWithoutCardInput>;
export const ArcadeTopUpCreateWithoutCardInputObjectZodSchema = makeSchema();

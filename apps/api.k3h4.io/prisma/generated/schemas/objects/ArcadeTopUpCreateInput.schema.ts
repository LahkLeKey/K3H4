import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema as UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeTopUpsInput.schema';
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
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema),
  card: z.lazy(() => ArcadeCardCreateNestedOneWithoutTopUpsInputObjectSchema)
}).strict();
export const ArcadeTopUpCreateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateInput>;
export const ArcadeTopUpCreateInputObjectZodSchema = makeSchema();

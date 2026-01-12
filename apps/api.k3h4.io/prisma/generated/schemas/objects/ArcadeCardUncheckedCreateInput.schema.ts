import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { ArcadeTopUpUncheckedCreateNestedManyWithoutCardInputObjectSchema as ArcadeTopUpUncheckedCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedCreateNestedManyWithoutCardInput.schema';
import { ArcadeSessionUncheckedCreateNestedManyWithoutCardInputObjectSchema as ArcadeSessionUncheckedCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedCreateNestedManyWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  label: z.string().optional().nullable(),
  balance: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balance' must be a Decimal",
}).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  topUps: z.lazy(() => ArcadeTopUpUncheckedCreateNestedManyWithoutCardInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedCreateNestedManyWithoutCardInputObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInputObjectSchema).optional()
}).strict();
export const ArcadeCardUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ArcadeCardUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUncheckedCreateInput>;
export const ArcadeCardUncheckedCreateInputObjectZodSchema = makeSchema();

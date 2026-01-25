import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { ArcadeTopUpUncheckedCreateNestedManyWithoutCardInputObjectSchema as ArcadeTopUpUncheckedCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedCreateNestedManyWithoutCardInput.schema';
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
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  topUps: z.lazy(() => ArcadeTopUpUncheckedCreateNestedManyWithoutCardInputObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInputObjectSchema).optional()
}).strict();
export const ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUncheckedCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUncheckedCreateWithoutSessionsInput>;
export const ArcadeCardUncheckedCreateWithoutSessionsInputObjectZodSchema = makeSchema();

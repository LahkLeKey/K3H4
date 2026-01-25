import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutArcadeCardsInputObjectSchema as UserCreateNestedOneWithoutArcadeCardsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeCardsInput.schema';
import { ArcadeSessionCreateNestedManyWithoutCardInputObjectSchema as ArcadeSessionCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeSessionCreateNestedManyWithoutCardInput.schema';
import { ArcadeRedemptionCreateNestedManyWithoutCardInputObjectSchema as ArcadeRedemptionCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateNestedManyWithoutCardInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeCardsInputObjectSchema),
  sessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutCardInputObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionCreateNestedManyWithoutCardInputObjectSchema).optional()
}).strict();
export const ArcadeCardCreateWithoutTopUpsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateWithoutTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateWithoutTopUpsInput>;
export const ArcadeCardCreateWithoutTopUpsInputObjectZodSchema = makeSchema();

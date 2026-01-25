import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutArcadeCardsInputObjectSchema as UserCreateNestedOneWithoutArcadeCardsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeCardsInput.schema';
import { ArcadeTopUpCreateNestedManyWithoutCardInputObjectSchema as ArcadeTopUpCreateNestedManyWithoutCardInputObjectSchema } from './ArcadeTopUpCreateNestedManyWithoutCardInput.schema';
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
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeCardsInputObjectSchema),
  topUps: z.lazy(() => ArcadeTopUpCreateNestedManyWithoutCardInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutCardInputObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionCreateNestedManyWithoutCardInputObjectSchema).optional()
}).strict();
export const ArcadeCardCreateInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateInput>;
export const ArcadeCardCreateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureSlotsInputObjectSchema as UserCreateNestedOneWithoutAgricultureSlotsInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureSlotsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  slotIndex: z.number().int(),
  unlockedAt: z.coerce.date().optional(),
  costPaid: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costPaid' must be a Decimal",
}).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureSlotsInputObjectSchema)
}).strict();
export const AgricultureSlotCreateWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateWithoutPlotInput>;
export const AgricultureSlotCreateWithoutPlotInputObjectZodSchema = makeSchema();

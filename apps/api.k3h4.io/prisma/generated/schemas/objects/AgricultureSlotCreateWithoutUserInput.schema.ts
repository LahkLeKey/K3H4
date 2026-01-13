import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { AgriculturePlotCreateNestedOneWithoutSlotsInputObjectSchema as AgriculturePlotCreateNestedOneWithoutSlotsInputObjectSchema } from './AgriculturePlotCreateNestedOneWithoutSlotsInput.schema'

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
  plot: z.lazy(() => AgriculturePlotCreateNestedOneWithoutSlotsInputObjectSchema).optional()
}).strict();
export const AgricultureSlotCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateWithoutUserInput>;
export const AgricultureSlotCreateWithoutUserInputObjectZodSchema = makeSchema();

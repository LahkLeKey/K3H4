import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  slotIndex: z.number().int(),
  unlockedAt: z.coerce.date().optional(),
  costPaid: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costPaid' must be a Decimal",
}).optional()
}).strict();
export const AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUncheckedCreateWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUncheckedCreateWithoutPlotInput>;
export const AgricultureSlotUncheckedCreateWithoutPlotInputObjectZodSchema = makeSchema();

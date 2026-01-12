import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  machineId: z.string(),
  creditsSpent: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditsSpent' must be a Decimal",
}),
  score: z.number().int().optional().nullable(),
  rewardRedemptionId: z.string().optional().nullable(),
  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().optional().nullable()
}).strict();
export const ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUncheckedCreateWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUncheckedCreateWithoutCardInput>;
export const ArcadeSessionUncheckedCreateWithoutCardInputObjectZodSchema = makeSchema();

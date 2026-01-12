import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  machineId: z.string(),
  cardId: z.string(),
  creditsSpent: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditsSpent' must be a Decimal",
}),
  score: z.number().int().optional().nullable(),
  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().optional().nullable()
}).strict();
export const ArcadeSessionCreateManyRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateManyRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyRewardRedemptionInput>;
export const ArcadeSessionCreateManyRewardRedemptionInputObjectZodSchema = makeSchema();

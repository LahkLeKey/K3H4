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
}).optional(),
  plotId: z.string().optional().nullable()
}).strict();
export const AgricultureSlotCreateManyInputObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateManyInput>;
export const AgricultureSlotCreateManyInputObjectZodSchema = makeSchema();

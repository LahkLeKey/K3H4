import * as z from 'zod';
import { Prisma } from '@prisma/client';


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
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ArcadeCardCreateManyUserInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateManyUserInput>;
export const ArcadeCardCreateManyUserInputObjectZodSchema = makeSchema();

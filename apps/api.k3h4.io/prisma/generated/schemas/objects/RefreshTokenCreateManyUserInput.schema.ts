import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date()
}).strict();
export const RefreshTokenCreateManyUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateManyUserInput>;
export const RefreshTokenCreateManyUserInputObjectZodSchema = makeSchema();

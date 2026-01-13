import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date()
}).strict();
export const RefreshTokenCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateWithoutUserInput>;
export const RefreshTokenCreateWithoutUserInputObjectZodSchema = makeSchema();

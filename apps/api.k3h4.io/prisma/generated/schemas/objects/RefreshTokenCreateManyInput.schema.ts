import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date()
}).strict();
export const RefreshTokenCreateManyInputObjectSchema: z.ZodType<Prisma.RefreshTokenCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenCreateManyInput>;
export const RefreshTokenCreateManyInputObjectZodSchema = makeSchema();

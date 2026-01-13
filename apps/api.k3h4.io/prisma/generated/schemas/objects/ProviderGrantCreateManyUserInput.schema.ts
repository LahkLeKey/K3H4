import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  provider: z.string(),
  providerId: z.string(),
  accessToken: z.string(),
  scope: z.string().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ProviderGrantCreateManyUserInputObjectSchema: z.ZodType<Prisma.ProviderGrantCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantCreateManyUserInput>;
export const ProviderGrantCreateManyUserInputObjectZodSchema = makeSchema();

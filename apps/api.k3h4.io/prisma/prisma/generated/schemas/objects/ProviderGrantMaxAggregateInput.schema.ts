import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  providerId: z.literal(true).optional(),
  accessToken: z.literal(true).optional(),
  scope: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const ProviderGrantMaxAggregateInputObjectSchema: z.ZodType<Prisma.ProviderGrantMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantMaxAggregateInputType>;
export const ProviderGrantMaxAggregateInputObjectZodSchema = makeSchema();

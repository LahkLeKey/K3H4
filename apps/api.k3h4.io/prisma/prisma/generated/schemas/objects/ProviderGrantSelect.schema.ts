import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  provider: z.boolean().optional(),
  providerId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  scope: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const ProviderGrantSelectObjectSchema: z.ZodType<Prisma.ProviderGrantSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantSelect>;
export const ProviderGrantSelectObjectZodSchema = makeSchema();

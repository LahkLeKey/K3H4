import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  expiresAt: z.boolean().optional()
}).strict();
export const RefreshTokenSelectObjectSchema: z.ZodType<Prisma.RefreshTokenSelect> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenSelect>;
export const RefreshTokenSelectObjectZodSchema = makeSchema();

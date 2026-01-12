import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeCardArgsObjectSchema as ArcadeCardArgsObjectSchema } from './ArcadeCardArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  cardId: z.boolean().optional(),
  card: z.union([z.boolean(), z.lazy(() => ArcadeCardArgsObjectSchema)]).optional(),
  amount: z.boolean().optional(),
  source: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const ArcadeTopUpSelectObjectSchema: z.ZodType<Prisma.ArcadeTopUpSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpSelect>;
export const ArcadeTopUpSelectObjectZodSchema = makeSchema();

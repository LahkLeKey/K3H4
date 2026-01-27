import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  targetType: z.boolean().optional(),
  targetId: z.boolean().optional(),
  targetLabel: z.boolean().optional(),
  description: z.boolean().optional(),
  metadata: z.boolean().optional(),
  payload: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const AiInsightSelectObjectSchema: z.ZodType<Prisma.AiInsightSelect> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightSelect>;
export const AiInsightSelectObjectZodSchema = makeSchema();

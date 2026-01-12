import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  task: z.boolean().optional(),
  station: z.boolean().optional(),
  dueAt: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const CulinaryPrepTaskSelectObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskSelect> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskSelect>;
export const CulinaryPrepTaskSelectObjectZodSchema = makeSchema();

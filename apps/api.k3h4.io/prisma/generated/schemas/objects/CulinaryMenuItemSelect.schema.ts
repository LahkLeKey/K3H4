import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  prepMinutes: z.boolean().optional(),
  cost: z.boolean().optional(),
  price: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const CulinaryMenuItemSelectObjectSchema: z.ZodType<Prisma.CulinaryMenuItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemSelect>;
export const CulinaryMenuItemSelectObjectZodSchema = makeSchema();

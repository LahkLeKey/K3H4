import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  slotIndex: z.boolean().optional(),
  unlockedAt: z.boolean().optional(),
  costPaid: z.boolean().optional(),
  plotId: z.boolean().optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional()
}).strict();
export const AgricultureSlotSelectObjectSchema: z.ZodType<Prisma.AgricultureSlotSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotSelect>;
export const AgricultureSlotSelectObjectZodSchema = makeSchema();

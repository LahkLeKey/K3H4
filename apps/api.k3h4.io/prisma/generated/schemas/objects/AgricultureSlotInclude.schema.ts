import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional()
}).strict();
export const AgricultureSlotIncludeObjectSchema: z.ZodType<Prisma.AgricultureSlotInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotInclude>;
export const AgricultureSlotIncludeObjectZodSchema = makeSchema();

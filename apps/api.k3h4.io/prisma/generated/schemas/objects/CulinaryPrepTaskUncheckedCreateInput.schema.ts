import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  task: z.string(),
  station: z.string(),
  dueAt: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CulinaryPrepTaskUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUncheckedCreateInput>;
export const CulinaryPrepTaskUncheckedCreateInputObjectZodSchema = makeSchema();

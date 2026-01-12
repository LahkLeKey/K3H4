import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  task: z.string(),
  station: z.string(),
  dueAt: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CulinaryPrepTaskCreateManyInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateManyInput>;
export const CulinaryPrepTaskCreateManyInputObjectZodSchema = makeSchema();

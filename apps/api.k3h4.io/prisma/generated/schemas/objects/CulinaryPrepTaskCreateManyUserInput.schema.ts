import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  task: z.string(),
  station: z.string(),
  dueAt: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CulinaryPrepTaskCreateManyUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateManyUserInput>;
export const CulinaryPrepTaskCreateManyUserInputObjectZodSchema = makeSchema();

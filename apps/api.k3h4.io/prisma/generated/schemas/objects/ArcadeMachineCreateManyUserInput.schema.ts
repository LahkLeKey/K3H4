import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  gameTitle: z.string(),
  status: z.string().optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ArcadeMachineCreateManyUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateManyUserInput>;
export const ArcadeMachineCreateManyUserInputObjectZodSchema = makeSchema();

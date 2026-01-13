import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PosStoreCreateManyUserInputObjectSchema: z.ZodType<Prisma.PosStoreCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateManyUserInput>;
export const PosStoreCreateManyUserInputObjectZodSchema = makeSchema();

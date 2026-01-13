import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PosStoreCreateManyInputObjectSchema: z.ZodType<Prisma.PosStoreCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateManyInput>;
export const PosStoreCreateManyInputObjectZodSchema = makeSchema();

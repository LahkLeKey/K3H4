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
export const PosStoreUncheckedCreateWithoutTicketsInputObjectSchema: z.ZodType<Prisma.PosStoreUncheckedCreateWithoutTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUncheckedCreateWithoutTicketsInput>;
export const PosStoreUncheckedCreateWithoutTicketsInputObjectZodSchema = makeSchema();

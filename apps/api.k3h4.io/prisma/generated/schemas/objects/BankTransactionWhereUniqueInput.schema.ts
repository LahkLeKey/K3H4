import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const BankTransactionWhereUniqueInputObjectSchema: z.ZodType<Prisma.BankTransactionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionWhereUniqueInput>;
export const BankTransactionWhereUniqueInputObjectZodSchema = makeSchema();

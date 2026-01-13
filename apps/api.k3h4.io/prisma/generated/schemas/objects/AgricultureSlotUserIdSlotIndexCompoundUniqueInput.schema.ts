import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  userId: z.string(),
  slotIndex: z.number().int()
}).strict();
export const AgricultureSlotUserIdSlotIndexCompoundUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUserIdSlotIndexCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUserIdSlotIndexCompoundUniqueInput>;
export const AgricultureSlotUserIdSlotIndexCompoundUniqueInputObjectZodSchema = makeSchema();

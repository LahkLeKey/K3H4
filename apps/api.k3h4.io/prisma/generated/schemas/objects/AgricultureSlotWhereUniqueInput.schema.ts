import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotUserIdSlotIndexCompoundUniqueInputObjectSchema as AgricultureSlotUserIdSlotIndexCompoundUniqueInputObjectSchema } from './AgricultureSlotUserIdSlotIndexCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId_slotIndex: z.lazy(() => AgricultureSlotUserIdSlotIndexCompoundUniqueInputObjectSchema).optional()
}).strict();
export const AgricultureSlotWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureSlotWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotWhereUniqueInput>;
export const AgricultureSlotWhereUniqueInputObjectZodSchema = makeSchema();

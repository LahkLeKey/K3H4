import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AssignmentPayoutWhereUniqueInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutWhereUniqueInput>;
export const AssignmentPayoutWhereUniqueInputObjectZodSchema = makeSchema();

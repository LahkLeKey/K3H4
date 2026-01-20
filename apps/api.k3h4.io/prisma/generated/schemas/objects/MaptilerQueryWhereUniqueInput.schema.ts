import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const MaptilerQueryWhereUniqueInputObjectSchema: z.ZodType<Prisma.MaptilerQueryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryWhereUniqueInput>;
export const MaptilerQueryWhereUniqueInputObjectZodSchema = makeSchema();

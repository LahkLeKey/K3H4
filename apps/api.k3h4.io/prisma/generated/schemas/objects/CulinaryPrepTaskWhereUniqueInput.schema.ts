import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CulinaryPrepTaskWhereUniqueInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskWhereUniqueInput>;
export const CulinaryPrepTaskWhereUniqueInputObjectZodSchema = makeSchema();

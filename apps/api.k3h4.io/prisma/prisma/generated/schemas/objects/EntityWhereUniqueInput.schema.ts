import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const EntityWhereUniqueInputObjectSchema: z.ZodType<Prisma.EntityWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityWhereUniqueInput>;
export const EntityWhereUniqueInputObjectZodSchema = makeSchema();

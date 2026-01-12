import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CulinaryMenuItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemWhereUniqueInput>;
export const CulinaryMenuItemWhereUniqueInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ArcadeCardWhereUniqueInputObjectSchema: z.ZodType<Prisma.ArcadeCardWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardWhereUniqueInput>;
export const ArcadeCardWhereUniqueInputObjectZodSchema = makeSchema();

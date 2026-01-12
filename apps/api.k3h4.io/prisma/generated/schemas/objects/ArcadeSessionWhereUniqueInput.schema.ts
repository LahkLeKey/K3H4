import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ArcadeSessionWhereUniqueInputObjectSchema: z.ZodType<Prisma.ArcadeSessionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionWhereUniqueInput>;
export const ArcadeSessionWhereUniqueInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ArcadeTopUpWhereUniqueInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpWhereUniqueInput>;
export const ArcadeTopUpWhereUniqueInputObjectZodSchema = makeSchema();

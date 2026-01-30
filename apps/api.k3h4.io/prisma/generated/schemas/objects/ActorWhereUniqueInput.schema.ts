import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ActorWhereUniqueInputObjectSchema: z.ZodType<Prisma.ActorWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorWhereUniqueInput>;
export const ActorWhereUniqueInputObjectZodSchema = makeSchema();

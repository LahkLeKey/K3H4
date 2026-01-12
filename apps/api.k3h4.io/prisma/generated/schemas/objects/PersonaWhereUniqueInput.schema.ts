import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PersonaWhereUniqueInputObjectSchema: z.ZodType<Prisma.PersonaWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaWhereUniqueInput>;
export const PersonaWhereUniqueInputObjectZodSchema = makeSchema();

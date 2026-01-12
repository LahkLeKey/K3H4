import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ArcadeMachineWhereUniqueInputObjectSchema: z.ZodType<Prisma.ArcadeMachineWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineWhereUniqueInput>;
export const ArcadeMachineWhereUniqueInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional()
}).strict();
export const UserPreferenceWhereUniqueInputObjectSchema: z.ZodType<Prisma.UserPreferenceWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceWhereUniqueInput>;
export const UserPreferenceWhereUniqueInputObjectZodSchema = makeSchema();

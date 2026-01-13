import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ArcadeRedemptionWhereUniqueInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionWhereUniqueInput>;
export const ArcadeRedemptionWhereUniqueInputObjectZodSchema = makeSchema();

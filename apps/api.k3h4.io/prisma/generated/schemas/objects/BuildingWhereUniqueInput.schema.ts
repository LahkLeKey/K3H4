import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  osmId: z.bigint().optional()
}).strict();
export const BuildingWhereUniqueInputObjectSchema: z.ZodType<Prisma.BuildingWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingWhereUniqueInput>;
export const BuildingWhereUniqueInputObjectZodSchema = makeSchema();

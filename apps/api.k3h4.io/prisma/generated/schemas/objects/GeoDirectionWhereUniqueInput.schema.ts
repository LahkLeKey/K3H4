import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const GeoDirectionWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoDirectionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionWhereUniqueInput>;
export const GeoDirectionWhereUniqueInputObjectZodSchema = makeSchema();

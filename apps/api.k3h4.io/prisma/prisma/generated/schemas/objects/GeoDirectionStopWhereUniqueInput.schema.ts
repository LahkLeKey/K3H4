import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const GeoDirectionStopWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopWhereUniqueInput>;
export const GeoDirectionStopWhereUniqueInputObjectZodSchema = makeSchema();

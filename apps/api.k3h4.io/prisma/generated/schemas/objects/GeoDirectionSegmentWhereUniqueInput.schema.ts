import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const GeoDirectionSegmentWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentWhereUniqueInput>;
export const GeoDirectionSegmentWhereUniqueInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const GeoDemTileCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheWhereUniqueInput>;
export const GeoDemTileCacheWhereUniqueInputObjectZodSchema = makeSchema();

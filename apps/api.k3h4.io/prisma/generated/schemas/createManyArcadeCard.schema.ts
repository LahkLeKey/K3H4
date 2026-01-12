import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardCreateManyInputObjectSchema as ArcadeCardCreateManyInputObjectSchema } from './objects/ArcadeCardCreateManyInput.schema';

export const ArcadeCardCreateManySchema: z.ZodType<Prisma.ArcadeCardCreateManyArgs> = z.object({ data: z.union([ ArcadeCardCreateManyInputObjectSchema, z.array(ArcadeCardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardCreateManyArgs>;

export const ArcadeCardCreateManyZodSchema = z.object({ data: z.union([ ArcadeCardCreateManyInputObjectSchema, z.array(ArcadeCardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
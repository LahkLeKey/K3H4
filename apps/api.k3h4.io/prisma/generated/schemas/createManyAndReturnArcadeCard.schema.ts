import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './objects/ArcadeCardSelect.schema';
import { ArcadeCardCreateManyInputObjectSchema as ArcadeCardCreateManyInputObjectSchema } from './objects/ArcadeCardCreateManyInput.schema';

export const ArcadeCardCreateManyAndReturnSchema: z.ZodType<Prisma.ArcadeCardCreateManyAndReturnArgs> = z.object({ select: ArcadeCardSelectObjectSchema.optional(), data: z.union([ ArcadeCardCreateManyInputObjectSchema, z.array(ArcadeCardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardCreateManyAndReturnArgs>;

export const ArcadeCardCreateManyAndReturnZodSchema = z.object({ select: ArcadeCardSelectObjectSchema.optional(), data: z.union([ ArcadeCardCreateManyInputObjectSchema, z.array(ArcadeCardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
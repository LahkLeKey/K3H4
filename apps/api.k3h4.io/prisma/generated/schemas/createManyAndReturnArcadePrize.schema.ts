import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './objects/ArcadePrizeSelect.schema';
import { ArcadePrizeCreateManyInputObjectSchema as ArcadePrizeCreateManyInputObjectSchema } from './objects/ArcadePrizeCreateManyInput.schema';

export const ArcadePrizeCreateManyAndReturnSchema: z.ZodType<Prisma.ArcadePrizeCreateManyAndReturnArgs> = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), data: z.union([ ArcadePrizeCreateManyInputObjectSchema, z.array(ArcadePrizeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeCreateManyAndReturnArgs>;

export const ArcadePrizeCreateManyAndReturnZodSchema = z.object({ select: ArcadePrizeSelectObjectSchema.optional(), data: z.union([ ArcadePrizeCreateManyInputObjectSchema, z.array(ArcadePrizeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
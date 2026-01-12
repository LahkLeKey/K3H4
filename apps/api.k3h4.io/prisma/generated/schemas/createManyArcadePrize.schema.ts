import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeCreateManyInputObjectSchema as ArcadePrizeCreateManyInputObjectSchema } from './objects/ArcadePrizeCreateManyInput.schema';

export const ArcadePrizeCreateManySchema: z.ZodType<Prisma.ArcadePrizeCreateManyArgs> = z.object({ data: z.union([ ArcadePrizeCreateManyInputObjectSchema, z.array(ArcadePrizeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeCreateManyArgs>;

export const ArcadePrizeCreateManyZodSchema = z.object({ data: z.union([ ArcadePrizeCreateManyInputObjectSchema, z.array(ArcadePrizeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
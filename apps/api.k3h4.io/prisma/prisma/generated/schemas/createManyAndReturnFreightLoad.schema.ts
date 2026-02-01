import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadCreateManyInputObjectSchema as FreightLoadCreateManyInputObjectSchema } from './objects/FreightLoadCreateManyInput.schema';

export const FreightLoadCreateManyAndReturnSchema: z.ZodType<Prisma.FreightLoadCreateManyAndReturnArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), data: z.union([ FreightLoadCreateManyInputObjectSchema, z.array(FreightLoadCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadCreateManyAndReturnArgs>;

export const FreightLoadCreateManyAndReturnZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), data: z.union([ FreightLoadCreateManyInputObjectSchema, z.array(FreightLoadCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
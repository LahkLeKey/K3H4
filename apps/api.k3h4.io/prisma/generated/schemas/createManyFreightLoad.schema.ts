import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadCreateManyInputObjectSchema as FreightLoadCreateManyInputObjectSchema } from './objects/FreightLoadCreateManyInput.schema';

export const FreightLoadCreateManySchema: z.ZodType<Prisma.FreightLoadCreateManyArgs> = z.object({ data: z.union([ FreightLoadCreateManyInputObjectSchema, z.array(FreightLoadCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadCreateManyArgs>;

export const FreightLoadCreateManyZodSchema = z.object({ data: z.union([ FreightLoadCreateManyInputObjectSchema, z.array(FreightLoadCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
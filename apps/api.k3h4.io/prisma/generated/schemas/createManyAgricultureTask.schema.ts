import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskCreateManyInputObjectSchema as AgricultureTaskCreateManyInputObjectSchema } from './objects/AgricultureTaskCreateManyInput.schema';

export const AgricultureTaskCreateManySchema: z.ZodType<Prisma.AgricultureTaskCreateManyArgs> = z.object({ data: z.union([ AgricultureTaskCreateManyInputObjectSchema, z.array(AgricultureTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskCreateManyArgs>;

export const AgricultureTaskCreateManyZodSchema = z.object({ data: z.union([ AgricultureTaskCreateManyInputObjectSchema, z.array(AgricultureTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCreateManyInputObjectSchema as AgricultureResourceCreateManyInputObjectSchema } from './objects/AgricultureResourceCreateManyInput.schema';

export const AgricultureResourceCreateManySchema: z.ZodType<Prisma.AgricultureResourceCreateManyArgs> = z.object({ data: z.union([ AgricultureResourceCreateManyInputObjectSchema, z.array(AgricultureResourceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCreateManyArgs>;

export const AgricultureResourceCreateManyZodSchema = z.object({ data: z.union([ AgricultureResourceCreateManyInputObjectSchema, z.array(AgricultureResourceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
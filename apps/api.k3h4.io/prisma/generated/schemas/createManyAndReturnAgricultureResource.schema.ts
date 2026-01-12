import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './objects/AgricultureResourceSelect.schema';
import { AgricultureResourceCreateManyInputObjectSchema as AgricultureResourceCreateManyInputObjectSchema } from './objects/AgricultureResourceCreateManyInput.schema';

export const AgricultureResourceCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureResourceCreateManyAndReturnArgs> = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), data: z.union([ AgricultureResourceCreateManyInputObjectSchema, z.array(AgricultureResourceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCreateManyAndReturnArgs>;

export const AgricultureResourceCreateManyAndReturnZodSchema = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), data: z.union([ AgricultureResourceCreateManyInputObjectSchema, z.array(AgricultureResourceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
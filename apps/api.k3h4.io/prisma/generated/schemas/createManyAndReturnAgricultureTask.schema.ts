import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './objects/AgricultureTaskSelect.schema';
import { AgricultureTaskCreateManyInputObjectSchema as AgricultureTaskCreateManyInputObjectSchema } from './objects/AgricultureTaskCreateManyInput.schema';

export const AgricultureTaskCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureTaskCreateManyAndReturnArgs> = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), data: z.union([ AgricultureTaskCreateManyInputObjectSchema, z.array(AgricultureTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskCreateManyAndReturnArgs>;

export const AgricultureTaskCreateManyAndReturnZodSchema = z.object({ select: AgricultureTaskSelectObjectSchema.optional(), data: z.union([ AgricultureTaskCreateManyInputObjectSchema, z.array(AgricultureTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
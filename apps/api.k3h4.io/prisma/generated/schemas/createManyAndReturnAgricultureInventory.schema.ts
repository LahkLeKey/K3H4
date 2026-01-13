import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryCreateManyInputObjectSchema as AgricultureInventoryCreateManyInputObjectSchema } from './objects/AgricultureInventoryCreateManyInput.schema';

export const AgricultureInventoryCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureInventoryCreateManyAndReturnArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), data: z.union([ AgricultureInventoryCreateManyInputObjectSchema, z.array(AgricultureInventoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateManyAndReturnArgs>;

export const AgricultureInventoryCreateManyAndReturnZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), data: z.union([ AgricultureInventoryCreateManyInputObjectSchema, z.array(AgricultureInventoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
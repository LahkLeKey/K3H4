import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryCreateManyInputObjectSchema as AgricultureInventoryCreateManyInputObjectSchema } from './objects/AgricultureInventoryCreateManyInput.schema';

export const AgricultureInventoryCreateManySchema: z.ZodType<Prisma.AgricultureInventoryCreateManyArgs> = z.object({ data: z.union([ AgricultureInventoryCreateManyInputObjectSchema, z.array(AgricultureInventoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateManyArgs>;

export const AgricultureInventoryCreateManyZodSchema = z.object({ data: z.union([ AgricultureInventoryCreateManyInputObjectSchema, z.array(AgricultureInventoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
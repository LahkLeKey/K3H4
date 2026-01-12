import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotCreateManyInputObjectSchema as AgricultureSlotCreateManyInputObjectSchema } from './objects/AgricultureSlotCreateManyInput.schema';

export const AgricultureSlotCreateManySchema: z.ZodType<Prisma.AgricultureSlotCreateManyArgs> = z.object({ data: z.union([ AgricultureSlotCreateManyInputObjectSchema, z.array(AgricultureSlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotCreateManyArgs>;

export const AgricultureSlotCreateManyZodSchema = z.object({ data: z.union([ AgricultureSlotCreateManyInputObjectSchema, z.array(AgricultureSlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
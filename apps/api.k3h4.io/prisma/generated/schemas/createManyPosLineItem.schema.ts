import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemCreateManyInputObjectSchema as PosLineItemCreateManyInputObjectSchema } from './objects/PosLineItemCreateManyInput.schema';

export const PosLineItemCreateManySchema: z.ZodType<Prisma.PosLineItemCreateManyArgs> = z.object({ data: z.union([ PosLineItemCreateManyInputObjectSchema, z.array(PosLineItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemCreateManyArgs>;

export const PosLineItemCreateManyZodSchema = z.object({ data: z.union([ PosLineItemCreateManyInputObjectSchema, z.array(PosLineItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
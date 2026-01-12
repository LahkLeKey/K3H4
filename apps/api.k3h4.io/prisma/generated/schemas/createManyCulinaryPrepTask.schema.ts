import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskCreateManyInputObjectSchema as CulinaryPrepTaskCreateManyInputObjectSchema } from './objects/CulinaryPrepTaskCreateManyInput.schema';

export const CulinaryPrepTaskCreateManySchema: z.ZodType<Prisma.CulinaryPrepTaskCreateManyArgs> = z.object({ data: z.union([ CulinaryPrepTaskCreateManyInputObjectSchema, z.array(CulinaryPrepTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateManyArgs>;

export const CulinaryPrepTaskCreateManyZodSchema = z.object({ data: z.union([ CulinaryPrepTaskCreateManyInputObjectSchema, z.array(CulinaryPrepTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
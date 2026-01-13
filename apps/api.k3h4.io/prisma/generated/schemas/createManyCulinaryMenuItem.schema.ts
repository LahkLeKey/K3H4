import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemCreateManyInputObjectSchema as CulinaryMenuItemCreateManyInputObjectSchema } from './objects/CulinaryMenuItemCreateManyInput.schema';

export const CulinaryMenuItemCreateManySchema: z.ZodType<Prisma.CulinaryMenuItemCreateManyArgs> = z.object({ data: z.union([ CulinaryMenuItemCreateManyInputObjectSchema, z.array(CulinaryMenuItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateManyArgs>;

export const CulinaryMenuItemCreateManyZodSchema = z.object({ data: z.union([ CulinaryMenuItemCreateManyInputObjectSchema, z.array(CulinaryMenuItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
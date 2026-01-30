import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingCreateManyInputObjectSchema as BuildingCreateManyInputObjectSchema } from './objects/BuildingCreateManyInput.schema';

export const BuildingCreateManySchema: z.ZodType<Prisma.BuildingCreateManyArgs> = z.object({ data: z.union([ BuildingCreateManyInputObjectSchema, z.array(BuildingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BuildingCreateManyArgs>;

export const BuildingCreateManyZodSchema = z.object({ data: z.union([ BuildingCreateManyInputObjectSchema, z.array(BuildingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
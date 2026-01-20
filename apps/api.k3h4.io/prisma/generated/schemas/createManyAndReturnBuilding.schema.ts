import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingCreateManyInputObjectSchema as BuildingCreateManyInputObjectSchema } from './objects/BuildingCreateManyInput.schema';

export const BuildingCreateManyAndReturnSchema: z.ZodType<Prisma.BuildingCreateManyAndReturnArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), data: z.union([ BuildingCreateManyInputObjectSchema, z.array(BuildingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BuildingCreateManyAndReturnArgs>;

export const BuildingCreateManyAndReturnZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), data: z.union([ BuildingCreateManyInputObjectSchema, z.array(BuildingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
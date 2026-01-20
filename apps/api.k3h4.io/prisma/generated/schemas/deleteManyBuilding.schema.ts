import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './objects/BuildingWhereInput.schema';

export const BuildingDeleteManySchema: z.ZodType<Prisma.BuildingDeleteManyArgs> = z.object({ where: BuildingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BuildingDeleteManyArgs>;

export const BuildingDeleteManyZodSchema = z.object({ where: BuildingWhereInputObjectSchema.optional() }).strict();
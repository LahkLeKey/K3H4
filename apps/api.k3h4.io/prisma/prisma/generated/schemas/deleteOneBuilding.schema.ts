import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './objects/BuildingInclude.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './objects/BuildingWhereUniqueInput.schema';

export const BuildingDeleteOneSchema: z.ZodType<Prisma.BuildingDeleteArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), where: BuildingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuildingDeleteArgs>;

export const BuildingDeleteOneZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), where: BuildingWhereUniqueInputObjectSchema }).strict();
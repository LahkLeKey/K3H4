import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './objects/BuildingInclude.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './objects/BuildingWhereUniqueInput.schema';

export const BuildingFindUniqueSchema: z.ZodType<Prisma.BuildingFindUniqueArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), where: BuildingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuildingFindUniqueArgs>;

export const BuildingFindUniqueZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), where: BuildingWhereUniqueInputObjectSchema }).strict();
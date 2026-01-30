import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './objects/BuildingInclude.schema';
import { BuildingUpdateInputObjectSchema as BuildingUpdateInputObjectSchema } from './objects/BuildingUpdateInput.schema';
import { BuildingUncheckedUpdateInputObjectSchema as BuildingUncheckedUpdateInputObjectSchema } from './objects/BuildingUncheckedUpdateInput.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './objects/BuildingWhereUniqueInput.schema';

export const BuildingUpdateOneSchema: z.ZodType<Prisma.BuildingUpdateArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), data: z.union([BuildingUpdateInputObjectSchema, BuildingUncheckedUpdateInputObjectSchema]), where: BuildingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BuildingUpdateArgs>;

export const BuildingUpdateOneZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), data: z.union([BuildingUpdateInputObjectSchema, BuildingUncheckedUpdateInputObjectSchema]), where: BuildingWhereUniqueInputObjectSchema }).strict();
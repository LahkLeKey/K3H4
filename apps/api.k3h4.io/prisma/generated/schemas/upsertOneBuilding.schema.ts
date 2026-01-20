import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './objects/BuildingInclude.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './objects/BuildingWhereUniqueInput.schema';
import { BuildingCreateInputObjectSchema as BuildingCreateInputObjectSchema } from './objects/BuildingCreateInput.schema';
import { BuildingUncheckedCreateInputObjectSchema as BuildingUncheckedCreateInputObjectSchema } from './objects/BuildingUncheckedCreateInput.schema';
import { BuildingUpdateInputObjectSchema as BuildingUpdateInputObjectSchema } from './objects/BuildingUpdateInput.schema';
import { BuildingUncheckedUpdateInputObjectSchema as BuildingUncheckedUpdateInputObjectSchema } from './objects/BuildingUncheckedUpdateInput.schema';

export const BuildingUpsertOneSchema: z.ZodType<Prisma.BuildingUpsertArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), where: BuildingWhereUniqueInputObjectSchema, create: z.union([ BuildingCreateInputObjectSchema, BuildingUncheckedCreateInputObjectSchema ]), update: z.union([ BuildingUpdateInputObjectSchema, BuildingUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.BuildingUpsertArgs>;

export const BuildingUpsertOneZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), where: BuildingWhereUniqueInputObjectSchema, create: z.union([ BuildingCreateInputObjectSchema, BuildingUncheckedCreateInputObjectSchema ]), update: z.union([ BuildingUpdateInputObjectSchema, BuildingUncheckedUpdateInputObjectSchema ]) }).strict();
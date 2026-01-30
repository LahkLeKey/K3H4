import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './objects/BuildingSelect.schema';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './objects/BuildingInclude.schema';
import { BuildingCreateInputObjectSchema as BuildingCreateInputObjectSchema } from './objects/BuildingCreateInput.schema';
import { BuildingUncheckedCreateInputObjectSchema as BuildingUncheckedCreateInputObjectSchema } from './objects/BuildingUncheckedCreateInput.schema';

export const BuildingCreateOneSchema: z.ZodType<Prisma.BuildingCreateArgs> = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), data: z.union([BuildingCreateInputObjectSchema, BuildingUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.BuildingCreateArgs>;

export const BuildingCreateOneZodSchema = z.object({ select: BuildingSelectObjectSchema.optional(), include: BuildingIncludeObjectSchema.optional(), data: z.union([BuildingCreateInputObjectSchema, BuildingUncheckedCreateInputObjectSchema]) }).strict();
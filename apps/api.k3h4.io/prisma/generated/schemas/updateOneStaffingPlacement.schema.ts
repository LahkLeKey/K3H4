import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './objects/StaffingPlacementInclude.schema';
import { StaffingPlacementUpdateInputObjectSchema as StaffingPlacementUpdateInputObjectSchema } from './objects/StaffingPlacementUpdateInput.schema';
import { StaffingPlacementUncheckedUpdateInputObjectSchema as StaffingPlacementUncheckedUpdateInputObjectSchema } from './objects/StaffingPlacementUncheckedUpdateInput.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './objects/StaffingPlacementWhereUniqueInput.schema';

export const StaffingPlacementUpdateOneSchema: z.ZodType<Prisma.StaffingPlacementUpdateArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), data: z.union([StaffingPlacementUpdateInputObjectSchema, StaffingPlacementUncheckedUpdateInputObjectSchema]), where: StaffingPlacementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateArgs>;

export const StaffingPlacementUpdateOneZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), data: z.union([StaffingPlacementUpdateInputObjectSchema, StaffingPlacementUncheckedUpdateInputObjectSchema]), where: StaffingPlacementWhereUniqueInputObjectSchema }).strict();
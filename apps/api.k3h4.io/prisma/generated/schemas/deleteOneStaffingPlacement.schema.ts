import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './objects/StaffingPlacementInclude.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './objects/StaffingPlacementWhereUniqueInput.schema';

export const StaffingPlacementDeleteOneSchema: z.ZodType<Prisma.StaffingPlacementDeleteArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), where: StaffingPlacementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementDeleteArgs>;

export const StaffingPlacementDeleteOneZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), where: StaffingPlacementWhereUniqueInputObjectSchema }).strict();
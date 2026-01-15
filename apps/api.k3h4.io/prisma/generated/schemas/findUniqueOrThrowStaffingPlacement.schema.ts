import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './objects/StaffingPlacementInclude.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './objects/StaffingPlacementWhereUniqueInput.schema';

export const StaffingPlacementFindUniqueOrThrowSchema: z.ZodType<Prisma.StaffingPlacementFindUniqueOrThrowArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), where: StaffingPlacementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementFindUniqueOrThrowArgs>;

export const StaffingPlacementFindUniqueOrThrowZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), where: StaffingPlacementWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './objects/StaffingPlacementInclude.schema';
import { StaffingPlacementCreateInputObjectSchema as StaffingPlacementCreateInputObjectSchema } from './objects/StaffingPlacementCreateInput.schema';
import { StaffingPlacementUncheckedCreateInputObjectSchema as StaffingPlacementUncheckedCreateInputObjectSchema } from './objects/StaffingPlacementUncheckedCreateInput.schema';

export const StaffingPlacementCreateOneSchema: z.ZodType<Prisma.StaffingPlacementCreateArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), data: z.union([StaffingPlacementCreateInputObjectSchema, StaffingPlacementUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementCreateArgs>;

export const StaffingPlacementCreateOneZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), data: z.union([StaffingPlacementCreateInputObjectSchema, StaffingPlacementUncheckedCreateInputObjectSchema]) }).strict();
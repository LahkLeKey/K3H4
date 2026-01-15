import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementIncludeObjectSchema as StaffingPlacementIncludeObjectSchema } from './objects/StaffingPlacementInclude.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './objects/StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementCreateInputObjectSchema as StaffingPlacementCreateInputObjectSchema } from './objects/StaffingPlacementCreateInput.schema';
import { StaffingPlacementUncheckedCreateInputObjectSchema as StaffingPlacementUncheckedCreateInputObjectSchema } from './objects/StaffingPlacementUncheckedCreateInput.schema';
import { StaffingPlacementUpdateInputObjectSchema as StaffingPlacementUpdateInputObjectSchema } from './objects/StaffingPlacementUpdateInput.schema';
import { StaffingPlacementUncheckedUpdateInputObjectSchema as StaffingPlacementUncheckedUpdateInputObjectSchema } from './objects/StaffingPlacementUncheckedUpdateInput.schema';

export const StaffingPlacementUpsertOneSchema: z.ZodType<Prisma.StaffingPlacementUpsertArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), where: StaffingPlacementWhereUniqueInputObjectSchema, create: z.union([ StaffingPlacementCreateInputObjectSchema, StaffingPlacementUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingPlacementUpdateInputObjectSchema, StaffingPlacementUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementUpsertArgs>;

export const StaffingPlacementUpsertOneZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), include: StaffingPlacementIncludeObjectSchema.optional(), where: StaffingPlacementWhereUniqueInputObjectSchema, create: z.union([ StaffingPlacementCreateInputObjectSchema, StaffingPlacementUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingPlacementUpdateInputObjectSchema, StaffingPlacementUncheckedUpdateInputObjectSchema ]) }).strict();
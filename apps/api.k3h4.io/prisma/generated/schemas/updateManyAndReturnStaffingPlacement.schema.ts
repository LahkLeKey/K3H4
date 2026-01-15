import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementSelectObjectSchema as StaffingPlacementSelectObjectSchema } from './objects/StaffingPlacementSelect.schema';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './objects/StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementWhereInputObjectSchema as StaffingPlacementWhereInputObjectSchema } from './objects/StaffingPlacementWhereInput.schema';

export const StaffingPlacementUpdateManyAndReturnSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyAndReturnArgs> = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), data: StaffingPlacementUpdateManyMutationInputObjectSchema, where: StaffingPlacementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyAndReturnArgs>;

export const StaffingPlacementUpdateManyAndReturnZodSchema = z.object({ select: StaffingPlacementSelectObjectSchema.optional(), data: StaffingPlacementUpdateManyMutationInputObjectSchema, where: StaffingPlacementWhereInputObjectSchema.optional() }).strict();
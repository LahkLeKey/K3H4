import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './objects/StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementWhereInputObjectSchema as StaffingPlacementWhereInputObjectSchema } from './objects/StaffingPlacementWhereInput.schema';

export const StaffingPlacementUpdateManySchema: z.ZodType<Prisma.StaffingPlacementUpdateManyArgs> = z.object({ data: StaffingPlacementUpdateManyMutationInputObjectSchema, where: StaffingPlacementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyArgs>;

export const StaffingPlacementUpdateManyZodSchema = z.object({ data: StaffingPlacementUpdateManyMutationInputObjectSchema, where: StaffingPlacementWhereInputObjectSchema.optional() }).strict();
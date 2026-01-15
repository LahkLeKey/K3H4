import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingPlacementWhereInputObjectSchema as StaffingPlacementWhereInputObjectSchema } from './objects/StaffingPlacementWhereInput.schema';

export const StaffingPlacementDeleteManySchema: z.ZodType<Prisma.StaffingPlacementDeleteManyArgs> = z.object({ where: StaffingPlacementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingPlacementDeleteManyArgs>;

export const StaffingPlacementDeleteManyZodSchema = z.object({ where: StaffingPlacementWhereInputObjectSchema.optional() }).strict();
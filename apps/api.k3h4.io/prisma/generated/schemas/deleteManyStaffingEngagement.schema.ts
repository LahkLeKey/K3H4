import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './objects/StaffingEngagementWhereInput.schema';

export const StaffingEngagementDeleteManySchema: z.ZodType<Prisma.StaffingEngagementDeleteManyArgs> = z.object({ where: StaffingEngagementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementDeleteManyArgs>;

export const StaffingEngagementDeleteManyZodSchema = z.object({ where: StaffingEngagementWhereInputObjectSchema.optional() }).strict();
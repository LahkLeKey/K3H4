import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './objects/StaffingEngagementWhereUniqueInput.schema';

export const StaffingEngagementDeleteOneSchema: z.ZodType<Prisma.StaffingEngagementDeleteArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementDeleteArgs>;

export const StaffingEngagementDeleteOneZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict();
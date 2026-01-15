import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './objects/StaffingEngagementWhereUniqueInput.schema';

export const StaffingEngagementFindUniqueSchema: z.ZodType<Prisma.StaffingEngagementFindUniqueArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementFindUniqueArgs>;

export const StaffingEngagementFindUniqueZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict();
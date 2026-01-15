import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './objects/StaffingEngagementWhereUniqueInput.schema';

export const StaffingEngagementFindUniqueOrThrowSchema: z.ZodType<Prisma.StaffingEngagementFindUniqueOrThrowArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementFindUniqueOrThrowArgs>;

export const StaffingEngagementFindUniqueOrThrowZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementCreateInputObjectSchema as StaffingEngagementCreateInputObjectSchema } from './objects/StaffingEngagementCreateInput.schema';
import { StaffingEngagementUncheckedCreateInputObjectSchema as StaffingEngagementUncheckedCreateInputObjectSchema } from './objects/StaffingEngagementUncheckedCreateInput.schema';

export const StaffingEngagementCreateOneSchema: z.ZodType<Prisma.StaffingEngagementCreateArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), data: z.union([StaffingEngagementCreateInputObjectSchema, StaffingEngagementUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementCreateArgs>;

export const StaffingEngagementCreateOneZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), data: z.union([StaffingEngagementCreateInputObjectSchema, StaffingEngagementUncheckedCreateInputObjectSchema]) }).strict();
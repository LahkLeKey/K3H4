import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementUpdateInputObjectSchema as StaffingEngagementUpdateInputObjectSchema } from './objects/StaffingEngagementUpdateInput.schema';
import { StaffingEngagementUncheckedUpdateInputObjectSchema as StaffingEngagementUncheckedUpdateInputObjectSchema } from './objects/StaffingEngagementUncheckedUpdateInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './objects/StaffingEngagementWhereUniqueInput.schema';

export const StaffingEngagementUpdateOneSchema: z.ZodType<Prisma.StaffingEngagementUpdateArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), data: z.union([StaffingEngagementUpdateInputObjectSchema, StaffingEngagementUncheckedUpdateInputObjectSchema]), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateArgs>;

export const StaffingEngagementUpdateOneZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), data: z.union([StaffingEngagementUpdateInputObjectSchema, StaffingEngagementUncheckedUpdateInputObjectSchema]), where: StaffingEngagementWhereUniqueInputObjectSchema }).strict();
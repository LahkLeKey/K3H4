import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementIncludeObjectSchema as StaffingEngagementIncludeObjectSchema } from './objects/StaffingEngagementInclude.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './objects/StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementCreateInputObjectSchema as StaffingEngagementCreateInputObjectSchema } from './objects/StaffingEngagementCreateInput.schema';
import { StaffingEngagementUncheckedCreateInputObjectSchema as StaffingEngagementUncheckedCreateInputObjectSchema } from './objects/StaffingEngagementUncheckedCreateInput.schema';
import { StaffingEngagementUpdateInputObjectSchema as StaffingEngagementUpdateInputObjectSchema } from './objects/StaffingEngagementUpdateInput.schema';
import { StaffingEngagementUncheckedUpdateInputObjectSchema as StaffingEngagementUncheckedUpdateInputObjectSchema } from './objects/StaffingEngagementUncheckedUpdateInput.schema';

export const StaffingEngagementUpsertOneSchema: z.ZodType<Prisma.StaffingEngagementUpsertArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema, create: z.union([ StaffingEngagementCreateInputObjectSchema, StaffingEngagementUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingEngagementUpdateInputObjectSchema, StaffingEngagementUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementUpsertArgs>;

export const StaffingEngagementUpsertOneZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), include: StaffingEngagementIncludeObjectSchema.optional(), where: StaffingEngagementWhereUniqueInputObjectSchema, create: z.union([ StaffingEngagementCreateInputObjectSchema, StaffingEngagementUncheckedCreateInputObjectSchema ]), update: z.union([ StaffingEngagementUpdateInputObjectSchema, StaffingEngagementUncheckedUpdateInputObjectSchema ]) }).strict();
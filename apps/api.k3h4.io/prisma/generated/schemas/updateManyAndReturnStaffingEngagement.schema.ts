import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementUpdateManyMutationInputObjectSchema as StaffingEngagementUpdateManyMutationInputObjectSchema } from './objects/StaffingEngagementUpdateManyMutationInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './objects/StaffingEngagementWhereInput.schema';

export const StaffingEngagementUpdateManyAndReturnSchema: z.ZodType<Prisma.StaffingEngagementUpdateManyAndReturnArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), data: StaffingEngagementUpdateManyMutationInputObjectSchema, where: StaffingEngagementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateManyAndReturnArgs>;

export const StaffingEngagementUpdateManyAndReturnZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), data: StaffingEngagementUpdateManyMutationInputObjectSchema, where: StaffingEngagementWhereInputObjectSchema.optional() }).strict();
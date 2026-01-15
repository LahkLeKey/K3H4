import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementUpdateManyMutationInputObjectSchema as StaffingEngagementUpdateManyMutationInputObjectSchema } from './objects/StaffingEngagementUpdateManyMutationInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './objects/StaffingEngagementWhereInput.schema';

export const StaffingEngagementUpdateManySchema: z.ZodType<Prisma.StaffingEngagementUpdateManyArgs> = z.object({ data: StaffingEngagementUpdateManyMutationInputObjectSchema, where: StaffingEngagementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateManyArgs>;

export const StaffingEngagementUpdateManyZodSchema = z.object({ data: StaffingEngagementUpdateManyMutationInputObjectSchema, where: StaffingEngagementWhereInputObjectSchema.optional() }).strict();